import { EventType } from '../types';
import {
  runBoostrap,
  runBeforeLoad,
  runMounted,
  runUnmounted,
} from '../lifeCycle';
import { getAppListStatus } from '../utils';

const capturedListeners: Record<EventType, Function[]> = {
  hashchange: [],
  popstate: [],
};

// 劫持和 history 和 hash 相关的事件和函数
// 然后我们在劫持的方法里做一些自己的事情
// 比如说在 URL 发生改变的时候判断当前是否切换了子应用

// 保存原有方法
const originalPush = window.history.pushState;
const originalReplace = window.history.replaceState;

let historyEvent: PopStateEvent | null = null;

let lastUrl: string | null = null;

//
export const reroute = (curPathname: string = location.pathname) => {
  if (curPathname !== lastUrl) {
    const { activeApps, unmountApps } = getAppListStatus();
    Promise.all([
      ...unmountApps.map(async (app) => {
        await runUnmounted(app);
      }),
      ...activeApps.map(async (app) => {
        await runBeforeLoad(app);
        await runBoostrap(app);
        await runMounted(app);
      }),
    ]).then(() => {
      // 执行路由劫持小节未使用的函数
      callCapturedListeners();
    });
  }
  lastUrl = curPathname || location.href;
};

const handleUrlChange = () => {
  reroute(location.href);
};

/**
 * 路由劫持：核心代码
 * 1. 重写 pushState 以及 replaceState 方法
 * 2. 监听 popstate、hashchange 事件
 * 3. 劫持 addEventListener、removeEventListener 事件
 */
export const hijackRoute = () => {
  // 1. 重写 pushState 以及 replaceState 方法
  window.history.pushState = (...args) => {
    originalPush.apply(window.history, args);
    historyEvent = new PopStateEvent('popstate');
    args[2] && reroute(args[2] as string);
  };
  window.history.replaceState = (...args) => {
    originalReplace.apply(window.history, args);
    historyEvent = new PopStateEvent('popstate');
    args[2] && reroute(args[2] as string);
  };

  // 2. 监听 popstate、hashchange 事件
  window.addEventListener('hashchange', handleUrlChange);
  window.addEventListener('popstate', handleUrlChange);

  // 3. 劫持 addEventListener、removeEventListener 事件
  const hijackEventListener = (func: Function): any => {
    return function (name: string, fn: Function) {
      if (name === 'hashchange' || name === 'popstate') {
        if (!hasListeners(name, fn)) {
          // 注册事件
          capturedListeners[name].push(fn);
          return;
        } else {
          // 解绑事件
          capturedListeners[name] = capturedListeners[name].filter(
            (listener) => listener !== fn
          );
        }
      }

      // 一般的处理
      return func.apply(window, arguments);
    };
  };
  window.addEventListener = hijackEventListener(window.addEventListener);
  window.removeEventListener = hijackEventListener(window.removeEventListener);
};

const hasListeners = (name: EventType, fn: Function) => {
  return capturedListeners[name].filter((listener) => listener === fn).length;
};

export function callCapturedListeners() {
  if (historyEvent) {
    Object.keys(capturedListeners).forEach((eventName) => {
      const listeners = capturedListeners[eventName as EventType];
      if (listeners.length) {
        listeners.forEach((listener) => {
          // @ts-ignore
          listener.call(this, historyEvent);
        });
      }
    });
    historyEvent = null;
  }
}

export function cleanCapturedListeners() {
  capturedListeners['hashchange'] = [];
  capturedListeners['popstate'] = [];
}

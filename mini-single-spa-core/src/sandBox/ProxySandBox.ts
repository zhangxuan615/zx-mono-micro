import { FakeWindow, InternalAppInfoType } from "../types";
import { deepClone } from "../utils/object/deepCopy";
import {
  originalWindow,
  originalWindowAddEventListener,
  originalWindowRemoveEventListener,
} from "../utils/originalEnv";
import { needToBindOriginalWindowFunc, onEventTypes } from "./_utils";

/**
 * js 沙箱，用于隔离子应用 window 作用域
 */
export class ProxySandBox {
  private appName = ""; // 子应用名称
  private active = false; // 子应用是否激活
  private appWindow: FakeWindow; // 子应用 window 对象
  private proxyWindow: FakeWindow; // 子应用 window 的代理对象
  /**
   * 子应用重新挂载时不需要恢复的属性
   * setTimeout、setInternal、idle
   */
  // 子应用 setTimeout 集合，退出子应用时清除
  private timeoutSet = new Set<number>();
  // 子应用 setInterval 集合，退出子应用时清除
  private intervalSet = new Set<number>();
  // 子应用 requestIdleCallback 集合，退出子应用时清除
  private idleSet = new Set<number>();
  /**
   * 子应用重新挂载是需要恢复的属性
   * 属性、addEventListen 挂载的事件
   */
  private injectKeySet = new Set<PropertyKey>(); // 子应用向 window 注入的 key
  private windowEventMap = new Map<
    PropertyKey,
    { listener: any; options: any }[]
  >(); // 子应用绑定到 window 上的事件，退出子应用时清除
  private onWindowEventMap = new Map<
    PropertyKey,
    EventListenerOrEventListenerObject
  >(); // 子应用 window onxxx 事件集合，退出子应用时清除

  // 记录子应用准备挂载前的 window 快照: 代理了 window、document 的 addEventListener 和 window.onxxx 事件
  private windowSnapshot = new Map<PropertyKey, Map<PropertyKey, any>>();

  constructor(app: InternalAppInfoType) {
    this.appName = app.name;
    this.appWindow = this.createAppWindow(); // 1. 创建子应用 window 对象，劫持部分主应用 window 属性
    this.proxyWindow = this.createProxyWindow(); // 2. 创建子应用 window 代理对象
    // 3. 初始化子应用再次挂载时需要恢复的属性容器
    this.windowSnapshot = new Map([
      ["attrs", new Map()],
      ["windowEvents", new Map()],
      ["onWindowEvents", new Map()],
    ]);
  }

  /**
   *  1. 创建子应用 window 对象，劫持部分主应用 window 属性
   */
  createAppWindow() {
    const {
      timeoutSet,
      intervalSet,
      idleSet,
      windowEventMap,
      onWindowEventMap,
    } = this;

    const appWindow = {} as FakeWindow;
    /**
     * 子应用退出后再次挂载无需恢复
     * setTimeout  clearTimeout  setInterval clearInterval  requestIdleCallback cancelIdleCallback
     */
    // 劫持 setTimeout clearTimeout
    appWindow.setTimeout = function (
      callback: Function,
      timeout?: number | undefined
    ): number {
      const timer = originalWindow.setTimeout(callback, timeout);
      timeoutSet.add(timer);
      return timer;
    };
    appWindow.clearTimeout = function (timer?: number) {
      if (timer === undefined) {
        return;
      }
      originalWindow.clearTimeout(timer);
      timeoutSet.delete(timer);
    };
    // 劫持 setInterval clearInterval
    appWindow.setInterval = function (
      callback: Function,
      timeout?: number | undefined
    ): number {
      const timer = originalWindow.setInterval(callback, timeout);
      intervalSet.add(timer);
      return timer;
    };
    appWindow.clearInterval = function (timer?: number): void {
      if (timer === undefined) {
        return;
      }
      originalWindow.clearInterval(timer);
      intervalSet.delete(timer);
    };
    // 劫持 requestIdleCallback cancelIdleCallback
    appWindow.requestIdleCallback = function (
      callback: (options: any) => any,
      options?: { timeout: number }
    ): number {
      const timer = originalWindow.requestIdleCallback(callback, options);
      idleSet.add(timer);
      return timer;
    };
    appWindow.cancelIdleCallback = function (timer?: number): void {
      if (timer === undefined) {
        return;
      }
      originalWindow.cancelIdleCallback(timer);
      idleSet.delete(timer);
    };
    /**
     * 子应用退出后再次挂载需要恢复
     * addEventListener、window.onxxx 事件
     */
    // 劫持 addEventListener removeEventListener
    appWindow.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions | undefined
    ) {
      if (!windowEventMap.get(type)) {
        windowEventMap.set(type, []);
      }
      windowEventMap.get(type)?.push({ listener, options });

      return originalWindowAddEventListener.call(
        originalWindow,
        type,
        listener,
        options
      );
    };
    appWindow.removeEventListener = function removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions | undefined
    ) {
      const arr = windowEventMap.get(type) || [];
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].listener === listener) {
          arr.splice(i, 1);
          break;
        }
      }

      return originalWindowRemoveEventListener.call(
        originalWindow,
        type,
        listener,
        options
      );
    };
    // 劫持所有 window.onxxx 事件
    onEventTypes.forEach((eventType) => {
      Object.defineProperty(appWindow, `on${eventType}`, {
        configurable: true,
        enumerable: true,
        get() {
          return onWindowEventMap.get(eventType);
        },
        set(val) {
          onWindowEventMap.set(eventType, val);
          originalWindowAddEventListener.call(originalWindow, eventType, val);
        },
      });
    });

    return appWindow;
  }

  /**
   * 2. 创建子应用 window 代理对象
   */
  createProxyWindow() {
    return new Proxy(this.proxyWindow, {
      get(target, key) {
        // 避免用户逃逸： avoid who using window.window or window.self or window.globalThis to escape the sandbox environment to touch the really window
        switch (key) {
          case "window":
          case "self":
          case "globalThis":
            return this.proxyWindow;
        }

        if (Reflect.has(target, key)) {
          return Reflect.get(target, key);
        }

        const resultVal = originalWindow[key];
        // window 原生方法的 this 指向必须绑在 window 上运行，否则会报错 "TypeError: Illegal invocation"
        // e.g: const obj = {}; obj.alert = alert;  obj.alert();
        return needToBindOriginalWindowFunc(resultVal)
          ? resultVal.bind(originalWindow)
          : resultVal;
      },
      set: (target, key, value) => {
        if (!this.active) {
          return true;
        }

        this.injectKeySet.add(key);
        return Reflect.set(target, key, value);
      },
      has(target, key) {
        return key in target || key in originalWindow;
      },

      // Object.keys(window)
      // Object.getOwnPropertyNames(window)
      // Object.getOwnPropertySymbols(window)
      // Object.assign / {...o}
      ownKeys(target) {
        return [
          ...new Set([
            ...Reflect.ownKeys(target),
            ...Reflect.ownKeys(originalWindow),
          ]),
        ];
      },
      // Object.defineProperty(window, key, Descriptor)
      defineProperty(target, key, value) {
        if (!this.active) {
          return true;
        }
        this.injectKeySet.add(key);
        return Reflect.defineProperty(target, key, value);
      },
      // delete window[key]
      deleteProperty: (target, key) => {
        this.injectKeySet.delete(key);
        return Reflect.deleteProperty(target, key);
      },
      // Object.getOwnPropertyDescriptor(window, key)
      getOwnPropertyDescriptor(target, key) {
        // 为什么不使用 Reflect.getOwnPropertyDescriptor()
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor
        if (Reflect.has(target, key)) {
          // 这里的作用是保证在获取（Object.getOwnPropertyDescriptor）和设置（Object.defineProperty）一个 key 的 descriptor 时，都操作的是同一个对象
          // 即都操作 proxyWindow 或 originalWindow，否则会报错
          return Object.getOwnPropertyDescriptor(target, key);
        }

        Object.getOwnPropertyDescriptor(originalWindow, key);
      },

      // 返回真正的 window 原型：Object.getPrototypeOf(window)
      getPrototypeOf(target) {
        return Reflect.getPrototypeOf(originalWindow);
      },
    });
  }

  /**
   * 记录子应用快照
   */
  recordWindowSnapshot() {
    const {
      appWindow,
      windowSnapshot,
      injectKeySet,
      windowEventMap,
      onWindowEventMap,
    } = this;
    const recordAttrs = windowSnapshot.get("attrs");
    const recordWindowEvents = windowSnapshot.get("windowEvents");
    const recordOnWindowEvents = windowSnapshot.get("onWindowEvents");

    injectKeySet.forEach((key) => {
      recordAttrs.set(key, deepClone(appWindow[key]));
    });
    windowEventMap.forEach((arr, type) => {
      recordWindowEvents.set(type, deepClone(arr));
    });
    onWindowEventMap.forEach((func, type) => {
      recordOnWindowEvents.set(type, func);
    });
  }
  /**
   * 恢复子应用快照
   */
  restoreWindowSnapshot() {
    const {
      windowSnapshot,
      appWindow,
      injectKeySet,
      windowEventMap,
      onWindowEventMap,
    } = this;
    const recordAttrs = windowSnapshot.get("attrs");
    const recordWindowEvents = windowSnapshot.get("windowEvents");
    const recordOnWindowEvents = windowSnapshot.get("onWindowEvents");

    recordAttrs.forEach((value, key) => {
      injectKeySet.add(key);
      appWindow[key] = deepClone(value);
    });
    recordWindowEvents.forEach((arr, type) => {
      windowEventMap.set(type, deepClone(arr));
      for (const item of arr) {
        originalWindowAddEventListener.call(
          originalWindow,
          type,
          item.listener,
          item.options
        );
      }
    });
    recordOnWindowEvents.forEach((func, type) => {
      onWindowEventMap.set(type, func);
      originalWindowAddEventListener.call(originalWindow, type, func);
    });
  }

  /**
   * 开启沙箱
   */
  start() {
    if (this.active) {
      return;
    }
    this.active = true;

    // 如果当前子应用为第一个
    // if (++Sandbox.activeCount === 1) {
    //   patchDocument();
    //   patchDocumentEvents();
    // }
  }

  /**
   * 关闭沙箱
   */
  stop() {
    if (!this.active) {
      return;
    }
    this.active = false;

    const {
      injectKeySet,
      appWindow,
      timeoutSet,
      intervalSet,
      idleSet,
      windowEventMap,
      onWindowEventMap,
    } = this;

    /** 退出时需要清理掉的子应用副作用，再次挂载时不需要恢复 */
    for (const timer of timeoutSet) {
      originalWindow.clearTimeout(timer);
    }
    for (const timer of intervalSet) {
      originalWindow.clearInterval(timer);
    }
    for (const timer of idleSet) {
      originalWindow.cancelIdleCallback(timer);
    }
    timeoutSet.clear();
    intervalSet.clear();
    idleSet.clear();

    /** 退出时需要清理掉的子应用副作用，再次挂载时需要恢复 */
    for (const key of injectKeySet) {
      delete appWindow[key];
    }
    for (const [type, arr] of windowEventMap) {
      for (const item of arr) {
        originalWindowRemoveEventListener.call(
          originalWindow,
          type,
          item.listener,
          item.options
        );
      }
    }
    onEventTypes.forEach((eventType) => {
      const fn = onWindowEventMap.get(eventType);
      fn &&
        originalWindowRemoveEventListener.call(originalWindow, eventType, fn);
    });

    injectKeySet.clear();
    windowEventMap.clear();
    onWindowEventMap.clear();
  }
}

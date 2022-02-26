type FakeWindow = Window & Record<PropertyKey, any>;

export class ProxySandbox {
  proxy: FakeWindow;
  running = false;
  constructor() {
    // 创建个假的 window
    const fakeWindow = Object.create(null);

    // 进行代理
    const proxy = new Proxy(fakeWindow, {
      set: (target: FakeWindow, key: string, value: any) => {
        // 如果当前沙箱在运行，就直接把值设置到 fakeWindow 上
        if (this.running) {
          target[key] = value;
        }
        return true;
      },
      get(target: FakeWindow, key: string): any {
        // 避免用户逃逸： avoid who using window.window or window.self or window.globalThis to escape the sandbox environment to touch the really window
        switch (key) {
          case "window":
          case "self":
          case "globalThis":
            return proxy;
        }
        // 假如属性不存在 fakeWindow 上，但是存在于 window 上
        // 从 window 上取值
        if (!target.hasOwnProperty(key) && window.hasOwnProperty(key)) {
          let value = window[key];
          if (typeof value === "function") {
            value = value.bind(window);
          }
          return value;
        }
        return target[key];
      },
      has(target: FakeWindow, key: string) {
        return key in target || key in window;
      },
    });

    // 赋值代理对象
    this.proxy = proxy;
  }
  // 激活沙箱
  active() {
    this.running = true;
  }
  // 失活沙箱
  inactive() {
    this.running = false;
  }
}

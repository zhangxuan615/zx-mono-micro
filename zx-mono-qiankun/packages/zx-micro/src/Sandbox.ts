export class ProxySandbox {
  fakeWindow: any;
  running = false;

  constructor() {
    const fakeWindowObj = Object.create(null);
    const fakeWindowProxy = new Proxy(fakeWindowObj, {
      get(trapTarget: any, key: string, receiver: any): any {
        switch (key) {
          case 'window':
          case 'self':
          case 'globalThis':
            return fakeWindowObj;
        }

        // 沙箱对象上不包含该属性，但是 window 对象上有这个属性
        if (
          !Object.prototype.hasOwnProperty.call(trapTarget, key) &&
          Object.prototype.hasOwnProperty.call(window, key)
        ) {
          const value = window[key];
          if (typeof value === 'function') {
            return value.bind(window); // 函数 this 需要绑定 window
          }
          return value;
        }

        return Reflect.get(trapTarget, key, receiver);
      },

      set: (trapTarget: any, key: string, value: any, receiver: any) => {
        if (!this.running) {
          return false;
        }

        return Reflect.set(trapTarget, key, value, receiver);
      },

      has() {
        return true;
      }
    });
    this.fakeWindow = fakeWindowProxy;
  }

  // 激活当前沙箱
  active() {
    this.running = true;
  }

  // 失能当前沙箱
  inactive() {
    this.running = false;
  }
}

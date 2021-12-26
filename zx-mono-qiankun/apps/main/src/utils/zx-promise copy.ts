enum PRO_STATUS {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

class ZxPromise {
  private _state: PRO_STATUS = PRO_STATUS.PENDING;
  private _value: any;
  // 初始化 promise
  constructor(executor) {
    this._state = 'pending';
    this._value = undefined;
    this.rejectEx = undefined;
    this.handles = {
      resolveFns: [],
      rejectFns: []
    };
    const _self = this;

    function resolve(value) {
      if (_self.status !== 'pending') {
        return;
      }

      _self.status = 'fulfilled';
      _self.value = value;

      setTimeout(() => {
        _self.handles.resolveFns.forEach(fn => fn(value));
      }, 0);
    }

    function reject(value) {
      if (_self.status !== 'pending') {
        return;
      }

      _self.status = 'rejected';
      _self.value = value;

      if (_self.handles.rejectFns.length > 0) {
        setTimeout(() => {
          _self.handles.rejectFns.forEach(fn => fn(value));
        }, 0);
      } else {
        _self.rejectEx = setTimeout(() => {
          throw value;
        }, 0);
      }
    }

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(resolveCallack, rejectCallback) {
    const _self = this;

    return new Promise4((resolve, reject) => {
      function resolveRegister(value) {
        if (typeof resolveCallack !== 'function') {
          resolve(value);
          return;
        }

        try {
          let tmp = resolveCallack(value);
          if (tmp instanceof Promise4) {
            if (tmp.status === 'pending') return;
            else if (tmp.status === 'fulfilled') resolve(tmp.value);
            else if (tmp.status === 'rejected') reject(tmp.value);
          } else {
            resolve(tmp);
          }
        } catch (error) {
          reject(error);
        }
      }

      function rejectRegister(value) {
        if (typeof rejectCallback !== 'function') {
          reject(value);
          return;
        }

        try {
          clearTimeout(_self.rejectEx);
          let tmp = rejectCallback(value);
          if (tmp instanceof Promise4) {
            // 能够建立二者 promise 之间的状态关联
            // var a = new Promise()
            // var b = new Promise(resolve => {
            // resolve(a);
            // });
            // 这样的话，b 的状态即由 a 锁定，指挥跟随 a 状态变化而变化
            // 但是 a === b 返回 false
            return resolve(tmp);
          }
          resolve(tmp);
        } catch (error) {
          reject(error);
        }
      }

      switch (this.status) {
        case 'pending': // 如果是pedding状态，则将回调加入到队列
          this.handles.resolveFns.push(resolveRegister);
          this.handles.rejectFns.push(rejectRegister);
          break;
        case 'fulfilled': // 如果异步已经执行成功，则立刻执行then中注册的resolve方法
          setTimeout(() => {
            resolveRegister(this.value);
          }, 0);
          break;
        case 'rejected': // 如果异步已经执行失败，则立刻执行then中注册的reject方法
          clearTimeout(_self.rejectEx);
          setTimeout(() => {
            rejectRegister(this.value);
          }, 0);
          break;
        default:
          break;
      }
    });
  }

  catch(rejectCallback) {
    return this.then(null, rejectCallback);
  }
  static all(iterObj: any) {
    return new Promise((resolve, reject) => {
      const iterator = Symbol.iterator;
      // 参数必须是可迭代对象，否则立刻返回一个 rejected 状态的 promise(这个是同步的)
      if (!iterObj[iterator]) {
        reject('TypeError: param is not iterable');
      }

      // 参数是可迭代对象，则返回的 promise 状态一定是 pending，最终的状态决定是异步的
      // 将可迭代对象转化为 数组
      const iterObjArr = [...iterObj];
      const len = iterObjArr.length;
      if (len === 0) {
        // 只要参数是空数组，立即返回 resolve([]) 状态
        return resolve([]);
      }

      const value: any[] = [];
      let cnt = 0;
      for (let i = 0; i < len; ++i) {
        let promiseItem = iterObjArr[i];
        if (!(promiseItem instanceof Promise)) {
          promiseItem = Promise.resolve(promiseItem);
        }

        promiseItem.then(
          (val: any) => {
            value[i] = val;
            if (++cnt === len) {
              resolve(value);
            }
          },
          (val: any) => {
            // 不能使用 .catch
            reject(val);
          }
        );
      }
    });
  }
  static race(iterObj: any) {
    return new Promise((resolve, reject) => {
      const iterator = Symbol.iterator;
      // 参数必须是可迭代对象，否则立刻返回一个 rejected 状态的 promise(这个是同步的)
      if (!iterObj[iterator]) {
        return reject('TypeError: param is not iterable');
      }

      // 参数是可迭代对象，则返回的 promise 状态一定是 pending，最终的状态决定是异步的
      // 将可迭代对象转化为 数组
      const iterObjArr = [...iterObj];

      const len = iterObjArr.length;
      for (let i = 0; i < len; ++i) {
        let promiseItem = iterObjArr[i];
        if (!(promiseItem instanceof Promise)) {
          promiseItem = Promise.resolve(promiseItem);
        }

        promiseItem.then(
          (val: any) => {
            resolve(val);
          },
          (val: any) => {
            // 同样不能使用 .catch
            reject(val);
          }
        );
      }
    });
  }
}

export default ZxPromise;

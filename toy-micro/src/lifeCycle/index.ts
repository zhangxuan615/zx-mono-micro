import { IAppInfo, IInternalAppInfo, ILifeCycle, AppStatusEn } from '../types';
import { loadHTML } from '../loader';

/**
 * 主应用生命周期函数
 *   1. beforeLoad  挂载子应用前
 *   2. mounted  挂载子应用后
 *   3. unmounted  卸载子应用后
 */
let lifeCycle: ILifeCycle = {};
export const setLifeCycle = (list: ILifeCycle) => {
  lifeCycle = list;
};
export const getLifeCycle = () => {
  return lifeCycle;
};

/**
 * 子应用生命周期
 */
// 加载子应用资源
export const runBeforeLoad = async (app: IInternalAppInfo) => {
  app.status = AppStatusEn.LOADING;
  await runLifeCycle('beforeLoad', app);
  app = await loadHTML(app);
  app.status = AppStatusEn.LOADED;
};

// 首次应用加载触发，常用于配置子应用全局信息
export const runBoostrap = async (app: IInternalAppInfo) => {
  if (app.status !== AppStatusEn.LOADED) {
    return app;
  }
  app.status = AppStatusEn.BOOTSTRAPPING;
  await app.bootstrap?.(app);
  app.status = AppStatusEn.NOT_MOUNTED;
};

// 子应用挂载
// a. 先执行子应用挂载函数  b. 再执行主应用挂载函数
export const runMounted = async (app: IInternalAppInfo) => {
  // 子应用挂载
  app.status = AppStatusEn.MOUNTING;
  await app.mount?.(app);
  app.status = AppStatusEn.MOUNTED;

  // 执行主应用挂载
  await runLifeCycle('mounted', app);
};

// 子应用卸载
// a. 先执行子应用卸载函数  b. 再执行主应用卸载函数
export const runUnmounted = async (app: IInternalAppInfo) => {
  // 子应用挂载
  app.status = AppStatusEn.UNMOUNTING;
  app.proxy.inactive();
  await app.unmount?.(app);
  app.status = AppStatusEn.NOT_MOUNTED;

  // 执行主应用挂载
  await runLifeCycle('unmounted', app);
};

const runLifeCycle = async (name: keyof ILifeCycle, app: IAppInfo) => {
  const fn = lifeCycle[name];
  if (fn instanceof Array) {
    await Promise.all(fn.map((item) => item(app)));
  } else {
    await fn?.(app);
  }
};

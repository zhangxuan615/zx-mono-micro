import { AppInfoType, LifeCycleInfoType } from "../types";

const mainAppLifeCycle: LifeCycleInfoType = {};
export const setMainAppLifeCycle = (LifeCycle: LifeCycleInfoType) => {
  Object.assign(mainAppLifeCycle, LifeCycle);
};
export const getMainAppLifeCycle = () => {
  return mainAppLifeCycle;
};

/**
 * 执行主应用生命周期函数
 */
export const runMainAppLifeCycle = async (
  name: keyof LifeCycleInfoType,
  app: AppInfoType
) => {
  const fn = mainAppLifeCycle[name];
  if (fn instanceof Array) {
    await Promise.all(fn.map((item) => item(app)));
  } else {
    await fn(app);
  }
};

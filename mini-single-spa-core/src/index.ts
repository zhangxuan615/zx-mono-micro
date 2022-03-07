import { setMainAppLifeCycle } from "./lifeCycle/mainApp";
import setAppListMap from "./appList";
import { AppInfoType, LifeCycleInfoType } from "./types";

/**
 *
 * @param appList 子应用列表
 * @param lifeCycle 主应用生命周期函数
 *   1. beforeLoad  挂载子应用前
 *   2. mounted  挂载子应用后
 *   3. unmounted  卸载子应用后
 */
export const registerMicroApps = (
  appList: AppInfoType[],
  lifeCycle?: LifeCycleInfoType
) => {
  setAppListMap(appList);
  lifeCycle && setMainAppLifeCycle(lifeCycle);
};

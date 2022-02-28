/**
 * app 的状态集合
 */
export enum AppStatus {
  BEFORE_BOOTSTRAP = "BEFORE_BOOTSTRAP",
  BOOTSTRAPPED = "BOOTSTRAPPED",
  BEFORE_MOUNT = "BEFORE_MOUNT",
  MOUNTED = "MOUNTED",
  BEFORE_UNMOUNT = "BEFORE_UNMOUNT",
  UNMOUNTED = "UNMOUNTED",
  BOOTSTRAP_ERROR = "BOOTSTRAP_ERROR",
  MOUNT_ERROR = "MOUNT_ERROR",
  UNMOUNT_ERROR = "UNMOUNT_ERROR",
}

interface AppInfoType {
  name: string; // 子应用名称
  //   entry: string; // 子应用的资源入口
  /**
   * 激活规则，例如传入 /vue，当 url 的路径变为 /vue 时，激活当前子应用。
   * 如果 activeRule 为函数，则会传入 location 作为参数，activeRule(location) 返回 true 时，激活当前子应用。
   */
  activeRule: string | ((pathname: string) => boolean);
  /**
   * loadApp() 必须返回一个 Promise，resolve() 后得到一个对象：
   * {
   *   bootstrap: () => Promise<any>
   *   mount: (props: AnyObject) => Promise<any>
   *   unmount: (props: AnyObject) => Promise<any>
   * }
   */
  loadApp: () => Promise<any>;
}

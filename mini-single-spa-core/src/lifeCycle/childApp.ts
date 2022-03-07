export default async function bootstrapApp(app: Application) {
  triggerAppHook(app, "beforeBootstrap", AppStatus.BEFORE_BOOTSTRAP);

  try {
    // 加载 js css
    await parseHTMLandLoadSources(app);
  } catch (error) {
    app.status = AppStatus.BOOTSTRAP_ERROR;
    throw error;
  }

  // 开启沙箱
  if (isSandboxEnabled(app)) {
    app.sandbox = new Sandbox(app);
    app.sandbox.start();
  }

  app.container.innerHTML = app.pageBody;

  // 执行子应用入口页面的 style script 标签
  addStyles(app.styles);
  executeScripts(app.scripts, app);

  const { mount, unmount } = await getLifeCycleFuncs(app);

  validateLifeCycleFunc("mount", mount);
  validateLifeCycleFunc("unmount", unmount);

  app.mount = mount;
  app.unmount = unmount;

  try {
    app.props = await getProps(app.props);
  } catch (err) {
    app.status = AppStatus.BOOTSTRAP_ERROR;
    throw err;
  }

  // 子应用首次加载的脚本执行完就不再需要了
  app.scripts.length = 0;

  if (isSandboxEnabled(app)) {
    // 记录当前的 window 快照，重新挂载子应用时恢复
    app.sandbox.recordWindowSnapshot();
  }

  triggerAppHook(app, "bootstrapped", AppStatus.BOOTSTRAPPED);
}

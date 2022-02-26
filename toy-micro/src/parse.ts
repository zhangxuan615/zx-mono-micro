import { getCompletionURL } from "./loadResource";
import { IInternalAppInfo } from "./types";

const scripts: string[] = [];
const links: string[] = [];
const inlineScript: string[] = [];

/**
 * 递归遍历子应用的 dom 树：
 * 从 dom 树中捞出 link、script、img 标签
 */
export const parseHTML = (root: HTMLElement, app: IInternalAppInfo) => {
  // parent.children - HTMLCollection
  const children = Array.from(root.children) as HTMLElement[];
  children.length && children.forEach((item) => parseHTML(item, app));

  for (const dom of children) {
    if (/^(link)$/i.test(dom.tagName)) {
      const data = parseLink(dom, root, app);
      data && links.push(data);
    } else if (/^(script)$/i.test(dom.tagName)) {
      const data = parseScript(dom, root, app);
      data.text && inlineScript.push(data.text);
      data.url && scripts.push(data.url);
    } else if (/^(img)$/i.test(dom.tagName) && dom.hasAttribute("src")) {
      dom.setAttribute(
        "src",
        getCompletionURL(dom.getAttribute("src")!, app.entry)!
      );
    }
  }

  return { scripts, links, inlineScript };
};

/**
 * 处理 script 节点
 * 内联脚本：返回脚本字符串
 * 外链脚本：返回脚本url
 */
const parseScript = (
  scriptDom: HTMLElement,
  rootDom: HTMLElement,
  app: IInternalAppInfo
) => {
  const scriptSrc = scriptDom.getAttribute("src");
  rootDom.replaceChild(
    document.createComment(
      `${!scriptSrc ? "inline" : ""} script replaced by micro`
    ),
    scriptDom
  );
  return {
    url: getCompletionURL(scriptSrc, app.entry),
    text: scriptDom.innerHTML,
  };
};

/**
 * 返回 style 样式资源 url
 */
const parseLink = (
  linkDom: HTMLElement,
  rootDom: HTMLElement,
  app: IInternalAppInfo
) => {
  const rel = linkDom.getAttribute("rel");
  const href = linkDom.getAttribute("href");
  if (rel === "stylesheet" && href) {
    rootDom.replaceChild(
      document.createComment(`link replaced by micro`),
      linkDom
    );
    return getCompletionURL(href, app.entry);
  } else if (href) {
    linkDom.setAttribute("href", getCompletionURL(href, app.entry)!);
  }
};

/**
 * 加载应用的入口 html 资源
 */
export const loadHTML = async (app: IInternalAppInfo) => {
  const { container, entry } = app;
  const dom = document.querySelector(container);
  if (!dom) {
    throw new Error("容器不存在");
  }

  // 1. 加载入口资源
  const { template, getExternalScripts, getExternalStyleSheets } =
    await importEntry(entry);

  dom.innerHTML = template;

  await getExternalStyleSheets();
  const jsCode = await getExternalScripts();

  jsCode.forEach((script) => {
    const lifeCycle = runJS(script, app);
    if (lifeCycle) {
      app.bootstrap = lifeCycle.bootstrap;
      app.mount = lifeCycle.mount;
      app.unmount = lifeCycle.unmount;
    }
  });

  return app;
};

const runJS = (value: string, app: IInternalAppInfo) => {
  if (!app.proxy) {
    app.proxy = new ProxySandbox();
    // @ts-ignore
    window.__CURRENT_PROXY__ = app.proxy.proxy;
  }
  app.proxy.active();
  const code = `
      return (window => {
        ${value}
        return window['${app.name}']
      })(window.__CURRENT_PROXY__)
    `;
  return new Function(code)();
};

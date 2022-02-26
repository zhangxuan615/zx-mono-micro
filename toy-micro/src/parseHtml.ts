import importEntry from "import-html-entry";
import { fetchResource, getCompletionURL } from "./loadResource";
import { IInternalAppInfo } from "./types";

// src/loader/parse.ts
export const parseHTML = (parent: HTMLElement, app: IInternalAppInfo) => {
  const children = Array.from(parent.children) as HTMLElement[];
  children.length && children.forEach((item) => parseHTML(item, app));
  for (const dom of children) {
    if (/^(link)$/i.test(dom.tagName)) {
      // 处理 link
    } else if (/^(script)$/i.test(dom.tagName)) {
      // 处理 script
    } else if (/^(img)$/i.test(dom.tagName) && dom.hasAttribute("src")) {
      // 处理图片，毕竟图片资源用相对路径肯定也 404 了
      dom.setAttribute(
        "src",
        getCompletionURL(dom.getAttribute("src")!, app.entry)!
      );
    }
  }
  return {};
};

// 解析 link：通常获取 css 资源
const parseLink = (
  link: HTMLElement,
  parent: HTMLElement,
  app: IInternalAppInfo
) => {
  const rel = link.getAttribute("rel");
  const href = link.getAttribute("href");
  let comment: Comment | null;
  // 判断是不是获取 CSS 资源
  if (rel === "stylesheet" && href) {
    comment = document.createComment(`link replaced by micro`);
    // @ts-ignore
    comment && parent.replaceChild(comment, script);
    return getCompletionURL(href, app.entry);
  } else if (href) {
    link.setAttribute("href", getCompletionURL(href, app.entry)!);
  }
};

// src/loader/index.ts
export const loadHTML = async (app: IInternalAppInfo) => {
  const { container, entry } = app;
  const fakeContainer = document.createElement("div");
  fakeContainer.innerHTML = htmlFile;
  const { scripts, links, inlineScript } = parseHTML(fakeContainer, app);
  await Promise.all(links.map((link) => fetchResource(link)));
  const jsCode = (
    await Promise.all(scripts.map((script) => fetchResource(script)))
  ).concat(inlineScript);
  return app;
};

// 直接使用 import-html-entry 库处理文件的加载和解析
export const loadHTML = async (app: IInternalAppInfo) => {
  const { entry, container } = app;
  // template：处理好的 HTML 内容
  // getExternalStyleSheets：fetch CSS 文件
  // getExternalScripts：fetch JS 文件
  const { template, getExternalScripts, getExternalStyleSheets } =
    await importEntry(entry);
  const dom = document.querySelector(container);
  if (!dom) {
    throw new Error("容器不存在 ");
  }
  // 挂载 HTML 到微前端容器上
  dom.innerHTML = template;
  // 加载文件
  await getExternalStyleSheets();
  const jsCode = await getExternalScripts();
  return app;
};

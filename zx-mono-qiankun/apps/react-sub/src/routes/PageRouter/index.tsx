/**
 * Router：路由器
 * WithRouter：将一个非路由组件包裹为路由组件，使这个非路由组件也能访问到当前路由的match, location, history对象
 * Switch Route Redirect： 用于注册路由组件：绑定 路由 与 组件的映射关系
 * Switch 保证只渲染首次匹配成功的那一个 Route
 * 如果不使用 Switch，则路由匹配成功几个 Route 就渲染几个，没有匹配成功的就不渲染
 * 而使用 Redirect 则能够在没有成功匹配的时候跳转到默认路由
 * 是否匹配可通过 exact 参数来决定是否完全精确匹配
 *
 * 注意：Route 组件必须由Router、HashRouter、BrowserRouter组件包裹
 */
import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router';
/**
 * react-router 5.x 之后不再支持自定义传入 history，只能使用 react-router-dom 提供的路由器
 */
// import { createBrowserHistory, createHashHistory } from 'history';
import { BrowserRouter, HashRouter, withRouter, NavLink, Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import pageRoutes from '../route.config';

function PageRouter() {
  return <BrowserRouter>{renderRoutes(pageRoutes)}</BrowserRouter>;
}

export default PageRouter;

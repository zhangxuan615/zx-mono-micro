import React from 'react';
import { RouteConfig } from 'react-router-config';
import LazyLoadCom from './LazyLoadCom';
import { IS_CHILD_APP } from '@/configs/micro-fe';
import { APP_ROUTE_PREFIX_PATH } from '@/configs/env';

export const contentRoutes: RouteConfig[] = [
  {
    path: '/home',
    title: 'home',
    exact: true,
    component: LazyLoadCom(() => import(/* webpackChunkName:"home"*/ '../pages/Home'))
  },
  {
    path: '/delivery',
    title: 'delivery',
    exact: true,
    component: LazyLoadCom(
      () => import(/* webpackChunkName:"delivery"*/ '../pages/product/Delivery')
    )
  },
  {
    path: '/order',
    title: 'order',
    exact: true,
    component: LazyLoadCom(() => import(/* webpackChunkName:"delivery"*/ '../pages/product/Order'))
  },
  {
    path: '/sales',
    title: 'sales',
    exact: true,
    component: LazyLoadCom(() => import(/* webpackChunkName:"delivery"*/ '../pages/product/sales'))
  }
];

export const pageRoutes: RouteConfig[] = [
  {
    path: '/',
    // exact: true, // 一定不能精确匹配，否则 /a/b 不认为匹配 /a
    component: LazyLoadCom(() => import(/* webpackChunkName:"layout"*/ '../pages/BasicLayout')),
    routes: contentRoutes
  }
];

export default IS_CHILD_APP
  ? contentRoutes.map(item => ({ ...item, path: `${APP_ROUTE_PREFIX_PATH}${item.path}` }))
  : pageRoutes;

/**
 * 如果没有子路由的情况，建议大家配都加一个exact；如果有子路由，建议在子路由中加exact，父路由不加；
 * 而strict是针对是否有斜杠的，一般可以忽略不配置。
 */

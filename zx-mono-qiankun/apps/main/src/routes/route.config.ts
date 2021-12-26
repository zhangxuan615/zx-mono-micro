import React from 'react';
import { RouteConfig } from 'react-router-config';
import LazyLoadCom from './LazyLoadCom';

const pageRoutes: RouteConfig[] = [
  {
    path: '/login',
    exact: true,
    component: LazyLoadCom(() => import(/* webpackChunkName:"login"*/ '../pages/Login'))
  },
  {
    path: '/',
    // exact: true, // 一定不能精确匹配，否则 /a/b 不认为匹配 /a
    component: LazyLoadCom(() => import(/* webpackChunkName:"layout"*/ '../pages/BasicLayout')),
    routes: [
      {
        path: '/home',
        exact: true,
        component: LazyLoadCom(() => import(/* webpackChunkName:"home"*/ '../pages/Home'))
      },
      {
        path: '/delivery',
        exact: true,
        component: LazyLoadCom(
          () => import(/* webpackChunkName:"delivery"*/ '../pages/product/Delivery')
        )
      },
      {
        path: '/order',
        exact: true,
        component: LazyLoadCom(() => import(/* webpackChunkName:"order"*/ '../pages/product/Order'))
      },
      {
        path: '/sales',
        exact: true,
        component: LazyLoadCom(() => import(/* webpackChunkName:"sales"*/ '../pages/product/Sales'))
      }
    ]
  }
];

export default pageRoutes;

/**
 * 如果没有子路由的情况，建议大家配都加一个exact；如果有子路由，建议在子路由中加exact，父路由不加；
 * 而strict是针对是否有斜杠的，一般可以忽略不配置。
 */

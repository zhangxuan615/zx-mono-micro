import React from 'react';
import { RouteConfig } from 'react-router-config';
import LazyLoadCom from '../components/LazyLoadCom';

const pageRoutes: RouteConfig[] = [
  {
    path: '/main/login',
    exact: true,
    component: LazyLoadCom(() => import(/* webpackChunkName:"login"*/ '../pages/Login'))
  }
];

export default pageRoutes;

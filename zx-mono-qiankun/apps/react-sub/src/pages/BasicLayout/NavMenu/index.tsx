import React, { Component, useCallback, useMemo, useState } from 'react';
import { Link, withRouter, NavLink, Redirect } from 'react-router-dom';
import { Menu } from 'antd';

import menuList from '@routes/menu.config';

import './index.less';

const { SubMenu } = Menu;

/**
 * 左侧导航的组件
 */

function getMenuNodes(menuList: any[], pathname?: string) {
  return menuList.map(item => {
    if (!item.children) {
      return (
        <Menu.Item key={item.key}>
          <Link to={item.link}>
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
      );
    } else {
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
              <span>{item.title}</span>
            </span>
          }
        >
          {getMenuNodes(item.children, pathname)}
        </SubMenu>
      );
    }
  });
}
function NavMenu(props: any) {
  const pathname = props?.location?.pathname;

  // 根据menuList的数据数组生成对应的标签数组：使用map + 递归调用
  const menuNodes = useMemo(() => {
    return getMenuNodes(menuList, pathname);
  }, []);
  const { openKeysArr, activeKeys } = useMemo(() => {
    const openKeysArr: any[] = [];
    const activeKeys: any[] = [];
    (function findOpenKeys(list: any) {
      list.forEach((item: any) => {
        if (!item.children) {
          return;
        }

        const Obj = item.children.find((cItem: any) => cItem.link === pathname);
        if (Obj) {
          openKeysArr.push(item.key);
          activeKeys.push(Obj.key);
        }

        findOpenKeys(item.children);
      });
    })(menuList);

    return { openKeysArr, activeKeys };
  }, []);

  // 根据menuList的数据数组生成对应的标签数组：使用reduce + 递归调用
  // getMenuNodes_reduce = (menuList) => {
  //   return menuList.reduce((crtValue, item) => {
  //     // 向crtValue中添加Menu.Item、SubMenu

  //     if (!item.children) {
  //       crtValue.push(
  //         <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //             <Icon type={item.icon} />
  //             <span>{item.title}</span>
  //           </Link>
  //         </Menu.Item>
  //       );
  //     } else {
  //       // 得到当前请求的路由路径
  //       const { pathname } = this.props.location;
  //       // 查找一个与当前请求路径匹配的子item
  //       const cItem = item.children.find((cItem) => cItem.key === pathname);
  //       // 如果存在，说明当前item的子列表需要打开
  //       if (cItem) {
  //         this.openKey = item.key;
  //       }

  //       crtValue.push(
  //         <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //           {this.getMenuNodes_reduce(item.children)}
  //         </SubMenu>
  //       );
  //     }

  //     return crtValue;
  //   }, []);
  // };

  return (
    <div className="left-nav">
      <Menu
        mode="inline"
        defaultSelectedKeys={activeKeys}
        defaultOpenKeys={openKeysArr}
        style={{ height: '100%', borderRight: 0 }}
      >
        {menuNodes}
      </Menu>
    </div>
  );
}

/**
 * withRouter高阶组件：
 * 包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递3个属性：history/location/match
 */
export default withRouter(NavMenu);

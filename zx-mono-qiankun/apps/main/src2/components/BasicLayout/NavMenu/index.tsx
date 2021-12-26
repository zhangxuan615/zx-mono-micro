import React, { useMemo } from 'react';
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
        <Menu.Item
          key={item.key}
          onClick={() => {
            window.history.pushState({}, item.title, item.link);
          }}
        >
          <span>{item.title}</span>
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

export default NavMenu;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import { icons } from '@assets/imgs';
import NavMenu from './NavMenu';

import styles from './index.less';

const { Header, Footer, Sider, Content } = Layout;

const BasicLayout: React.FC<any> = props => {
  const { route } = props;

  return (
    <Layout className={styles['basic-layout-container']}>
      <Header className={styles['header']}>
        <div className={styles['logo']}>
          <img className={styles['img']} src={icons.proIcon} alt="" />
          <span className={styles['text']}>管理系统</span>
        </div>
      </Header>

      <Layout>
        <Sider
          style={{
            backgroundColor: '#ffff'
          }}
        >
          <NavMenu />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            className={styles.content}
            style={{
              padding: 24,
              margin: 0,
              minHeight: 560,
              backgroundColor: 'rgba(255, 255, 255, .1)'
            }}
          >
            {renderRoutes(route.routes)}
          </Content>

          <Footer
            style={{
              padding: 4,
              textAlign: 'center',
              color: '#cccccc',
              backgroundColor: '#ffff',
              marginTop: '16px'
            }}
          >
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );

  // return (
  //   <div className={styles.rootContainer}>
  //     <div className={styles.menus}>
  //       <NavLink activeStyle={{ color: "red" }} to="/">
  //         <div>home</div>
  //       </NavLink>
  //       <NavLink activeStyle={{ color: "red" }} to="/product">
  //         <div>product</div>
  //       </NavLink>
  //       <NavLink activeStyle={{ color: "red" }} to="/order">
  //         <div>order</div>
  //       </NavLink>
  //     </div>
  //     <div className={styles.menus}>{renderRoutes(route.routes)}</div>
  //   </div>
  // );
};

export default BasicLayout;

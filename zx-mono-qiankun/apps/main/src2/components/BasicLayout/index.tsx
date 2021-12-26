import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import { icons } from '@assets/imgs';
import NavMenu from './NavMenu';

import styles from './index.less';
import Loading from '../Loading';
import pageRoutes from '@/routes/route.config';

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
            <BrowserRouter>{renderRoutes(pageRoutes)}</BrowserRouter>;{/* 子应用 */}
            <Loading loading={true} />
            <main id="subapp-viewport">aaaa</main>
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
};

export default BasicLayout;

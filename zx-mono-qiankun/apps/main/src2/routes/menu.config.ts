const menuList = [
  {
    key: '/main-web',
    icon: 'appstore',
    title: '主应用',
    link: '',
    children: [
      // 子菜单列表
      {
        key: '/main-web/home',
        icon: 'home',
        title: '首页',
        link: '/main/home'
      },
      {
        key: '/main-web/login',
        icon: 'login',
        title: '登录',
        link: '/main/login'
      }
    ]
  },
  {
    key: '/app-web',
    icon: 'appstore',
    title: '子应用',
    link: '',
    children: [
      // 子菜单列表
      {
        key: '/app-web/react-sub',
        icon: 'product',
        title: 'react子应用',
        link: '/react-sub'
      },
      {
        key: '/app-web/html-sub',
        icon: 'product',
        title: 'html子应用',
        link: '/html-sub'
      },
      {
        key: '/app-web/normal-sub',
        icon: 'product',
        title: 'normal子应用',
        link: '/normal-sub'
      }
    ]
  }
];

export default menuList;

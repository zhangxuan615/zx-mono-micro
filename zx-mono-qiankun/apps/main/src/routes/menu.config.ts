const menuList = [
  {
    key: '/home',
    path: '/home',
    icon: 'home', // 图标名称
    title: '首页', // 菜单标题名称
    link: '/home' // 对应的路由path
  },
  {
    key: '/product',
    icon: 'appstore',
    title: '商品',
    link: '',
    children: [
      // 子菜单列表
      {
        key: '/product/delivery',
        icon: 'product',
        title: '物流',
        link: '/delivery'
      },
      {
        key: '/product/order',
        icon: 'product',
        title: '订单',
        link: '/order'
      },
      {
        key: '/product/sales',
        icon: 'product',
        title: '销售',
        link: '/sales'
      }
    ]
  },
  {
    key: '/subApp',
    icon: 'appstore',
    title: '子应用',
    link: '',
    children: [
      // 注册子应用菜单
      {
        key: '/subApp/react-sub',
        icon: '',
        title: 'react-spa子应用',
        // link: '/subApp/react-sub'
        link: '/react-sub/home'
      },
      {
        key: '/subApp/html-sub',
        icon: '',
        title: 'html-sub子应用',
        link: '/subApp/html-sub'
      }
    ]
  }
];

export default menuList;

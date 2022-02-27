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
        key: '/subApp/react-sub/home',
        icon: '',
        title: 'react-spa子应用-home',
        link: '/subApp/react-sub/home'
      },
      {
        key: '/subApp/react-sub/delivery',
        icon: '',
        title: 'react-spa子应用-delivery',
        link: '/subApp/react-sub/delivery'
      },
      {
        key: '/subApp/react-sub/order',
        icon: '',
        title: 'react-spa子应用-order',
        link: '/subApp/react-sub/order'
      },
      {
        key: '/subApp/react-sub/sales',
        icon: '',
        title: 'react-spa子应用-sales',
        link: '/subApp/react-sub/sales'
      },

      {
        key: '/subApp/html-sub',
        icon: '',
        title: 'html-sub子应用',
        link: '/subApp/html-sub'
      },
      {
        key: '/subApp/normal-sub',
        icon: '',
        title: 'normal-sub子应用',
        link: '/subApp/normal-sub'
      }
    ]
  }
];

export default menuList;

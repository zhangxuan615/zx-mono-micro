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
  }
];

export default menuList;

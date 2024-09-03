export default [
  // {
  //   name: '登录',
  //   path: '/login',
  //   component: '@/pages/Login',
  //   icon: 'HomeOutlined',
  //   layout: false,
  // },
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: '@/pages/Home',
    icon: 'HomeOutlined',
  },
  {
    // name: '权限演示',
    // path: '/access',
    // component: '@/pages/Access',
    // icon: 'LockOutlined',
    // access: 'isAdmin',
  },
  {
    name: ' CRUD 示例',
    path: '/table',
    component: '@/pages/Table',
    icon: 'NodeCollapseOutlined',
  },
  // 子路由嵌套写法
  {
    name: ' 创作者中心',
    path: '/creator',
    icon: 'CloudSyncOutlined',
    // access: 'isRoot',
    routes: [
      {
        path: '/creator/content',
        component: '@/pages/Creator/Content',
        name: '我的创作',
      },
      {
        path: '/creator/article',
        component: '@/pages/Creator/Article',
        name: '文章管理',
      },
      {
        path: '/creator/column',
        component: '@/pages/Creator/Column',
        name: '专栏管理',
      },
    ],
  },
  {
    name: '分类管理',
    path: '/category',
    icon: 'SplitCellsOutlined',
    // access: 'isAdmin',
    routes: [
      {
        path: '/category/catelist',
        component: '@/pages/Category/CateList',
        name: '分类列表',
      },
      {
        path: '/category/catepub',
        component: '@/pages/Category/CatePub',
        name: '分类发布',
        // access: 'isRoot',
      },
    ],
  },
  {
    name: '轮播管理',
    path: '/banner',
    // component: '@/layouts/index',
    icon: 'FileImageOutlined',
    // access: 'isAdmin',
    routes: [
      {
        path: '/banner/pub',
        component: '@/pages/banner/pub',
        name: '轮播发布',
      },
      {
        path: '/banner/list',
        component: '@/pages/banner/list',
        name: '轮播列表',
      },
      {
        path: '/banner/edit/:id',
        component: '@/pages/banner/edit',
        name: '轮播编辑',
        // 新页面打开
        target: '_blank',
        // 隐藏自己和子菜单
        hideInMenu: true,
      },
    ],
  },
  {
    name: '商品管理',
    path: '/goods',
    icon: 'ProductOutlined',
    // access: 'isAdmin',
    routes: [
      {
        path: '/goods/pub',
        component: '@/pages/goods/pub',
        name: '商品发布',
      },
      {
        path: '/goods/list',
        component: '@/pages/goods/list',
        name: '商品列表',
      },
    ],
  },
  {
    path: '/editor',
    layout: false,
    component: '@/pages/Editor',
  },
  {
    path: '/upload',
    name: '上传文件',
    component: '@/pages/Upload',
    icon: 'CloudUploadOutlined',
    // access: 'isRoot',
  },
  {
    name: ' 消息列表',
    path: '/message',
    icon: 'MessageOutlined',
    routes: [
      {
        path: '/message/warning',
        component: '@/pages/Message/Warning',
        name: '提示消息',
      },
      {
        path: '/message/list',
        component: '@/pages/Message/List',
        name: '消息列表',
      },
    ],
  },

  {
    path: '/area',
    component: '@/pages/Area/index',
    name: '配送范围',
    icon: 'HeatMapOutlined',
    // access: 'isRoot',
  },
  {
    name: ' 系统设置',
    path: '/system',
    icon: 'SettingOutlined',
    // access: 'isRoot',
    routes: [
      {
        path: '/system/role',
        component: '@/pages/System/Role',
        name: '角色管理',
      },
      {
        path: '/system/account',
        component: '@/pages/System/Account',
        name: '账号管理',
      },
    ],
  },
];

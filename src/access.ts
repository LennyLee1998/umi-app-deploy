// import { history } from 'umi';

interface IInitialState extends API.UserInfo {
  isLogin: boolean;
  userInfo: object | null;
}
export default (initialState: IInitialState) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  console.log(initialState);
  const role = initialState?.userInfo?.role as string[];
  // const canSeeAdmin = !!(
  //   initialState && initialState.name !== 'dontHaveAccess'
  // );
  return {
    // isRoot: false,
    isRoot: role?.includes('root'),
    // isAdmin: false,
    isAdmin: role?.includes('root') || role?.includes('admin'),
    // isStaff: true,
    isStaff: true,
  };
};

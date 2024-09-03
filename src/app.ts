// 运行时配置
import { message } from 'antd';
import type { RequestConfig } from 'umi';
import { history } from 'umi';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
// 初始化某些全局数据得运行时配置
interface IInitialState extends API.UserInfo {
  isLogin: boolean;
  userInfo: object | null;
}
export async function getInitialState(): Promise<IInitialState> {
  let userState = {
    isLogin: false,
    userInfo: null,
  };
  let info =
    (localStorage.getItem('userInfo') as string) ||
    sessionStorage.getItem('userInfo');
  if (info) {
    userState = {
      isLogin: true,
      userInfo: JSON.parse(info),
    };
  }
  return userState;
}

// layout的运行时配置,自定义控制layout的渲染逻辑
// 通过getInitialState获取的值会透传给initialState
export const layout = (initialState: IInitialState) => {
  return {
    onPageChange: () => {
      // console.log('aaa');
      // console.log(initialState);
      const { location } = history;
      if (
        !initialState.initialState.isLogin &&
        location.pathname !== '/login'
      ) {
        history.push('/login');
      }
    },
    logo: 'https://telegraph-image-2s1.pages.dev/file/877db020dd515fe265932.png',
    menu: {
      locale: false,
    },
    fixedHeader: true,
  };
};
interface ResponseData {
  message: string;
  code: number;
  data?: any;
}
export const request: RequestConfig = {
  timeout: 100000,
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://umi-app-deploy.vercel.app/api/app'
      : 'http://localhost:8989',
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [
    // (config: any) => {
    //   console.log(config);
    //   return config;
    // },
  ],
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      console.log(response);
      // console.log(response.config.method?.toLocaleLowerCase());
      if (
        response.status === 200 &&
        ['post', 'put'].includes(
          response.config.method?.toLocaleLowerCase() as string,
        )
      ) {
        // 添加类型断言 通过类型断言，可以明确告诉 TypeScript 该变量的确切类型，从而使其能够正确处理代码中的类型检查。
        const data = response.data as ResponseData;
        message.success(data.message, 2);
      }
      return response;
    },
  ],
};

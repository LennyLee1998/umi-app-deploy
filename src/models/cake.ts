// import { getAllBannerApi } from '@/services/banner';

// // 组件内尽可能的不去维护数据，而是通过 connect 去关联 model 中的数据。页面有操作的时候则触发一个 action 去请求后端接口以及修改 model 中的数据，将业务逻辑分离到一个环形的闭环中，使得数据在其中单向流动。让应用更好维护。
// export default {
//   state: {
//     banner: [],
//   },

//   // effect请求后端返回数据
//   effects: {
//     *getAllBannerApi({ payload }, { call, put }) {
//       const { data } = yield call(getAllBannerApi, payload);
//       yield put({ type: 'queryBannerSuccess', payload: data });
//     },
//   },

//   // 使用得到的数据通过reducer改变state
//   reducers: {
//     queryBannerSuccess(state: any, { payload }) {
//       return {
//         ...state,
//         banners: payload,
//       };
//     },
//   },

//   test(state) {
//     console.log('test');
//     return state;
//   },
// };

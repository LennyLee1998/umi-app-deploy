const addNumRequest = (todo) => {
  console.log(todo);
  return new Promise((resolve, reject) => {
    if (todo.name === 'lenny') {
      setTimeout(resolve, 5000, 20);
    } else {
      reject('failed');
    }
  });
};
export default {
  state: {
    num: 100,
  },
  reducers: {
    // { payload: userInfo } 是一个解构赋值的写法，它从传入的对象中提取 payload 属性，并将其重命名为 userInfo。
    increment: (state: any, { payload: userInfo }) => {
      console.log(userInfo);
      return { ...state, num: state.num + userInfo };
    },
    decrement: (state: any) => {
      return { ...state, num: state.num - 1 };
    },
  },
  effects: {
    *addNumAsync({ payload: todo }, { put, call }) {
      // 用于调用异步逻辑，支持 promise 。
      const res = yield call(addNumRequest, todo);
      console.log(res);
      // 用于触发reducer的 action 。
      yield put({ type: 'increment', payload: res });
    },
  },
};

import { produce } from 'immer';
export default {
  state: {
    messageList: [
      {
        picture: 'https://randomuser.me/api/portraits/men/78.jpg',
        title: '年终奖预告',
        desc: '如果坚持到年底, 会得到4个月年终',
        read: false, //是否已读
      },
      {
        picture: 'https://randomuser.me/api/portraits/men/78.jpg',
        title: '年终奖预告1',
        desc: '如果坚持到年底, 会得到4个月年终',
        read: true, //是否已读
      },
      {
        picture: 'https://randomuser.me/api/portraits/men/78.jpg',
        title: '年终奖预告11',
        desc: '如果坚持到年底, 会得到4个月年终',
        read: false, //是否已读
      },
    ],
    total: 3,
  },
  reducers: {
    readChange: (state: any, { payload: index }) => {
      // const newList = [...state.messageList];
      // newList[index].read = true;
      // return { ...state, massageList: newList };

      return produce(state, (draft: any) => {
        draft.messageList[index].read = true;
      });
    },
  },
};

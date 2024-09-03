import { Avatar, Button, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
interface DataType {
  title: string;
  picture: string;
  desc: string;
  read: boolean;
}
interface IProps {
  message: {
    messageList: DataType[];
    total: number;
  };
}
const MessageList: React.FC<IProps> = (props) => {
  console.log(props);
  const { messageList, total } = props.message;
  const [initLoading, setInitLoading] = useState(true);
  // const [list, setList] = useState<DataType[]>([]);
  // const [loading, setLoading] = useState(true);
  const fetchList = () => {
    const resData: DataType[] = [
      {
        picture: 'https://randomuser.me/api/portraits/men/78.jpg',
        title: '年终奖预告',
        desc: '如果坚持到年底, 会得到4个月年终',
        loading: false,
      },
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(resData);
      }, 5000);
    });
  };
  useEffect(() => {
    fetchList().then((res) => {
      console.log(res);
      setInitLoading(false);
      // setLoading(false)
      // setList(res as DataType[]);
    });
  }, []);
  const handleReadClick = (index: number) => {
    props.dispatch({
      type: 'message/readChange',
      payload: index,
    });
  };

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      dataSource={messageList}
      renderItem={(item: DataType, index) => (
        <List.Item
          actions={[
            <Button
              key="list-loadmore-edit"
              type="primary"
              size="small"
              disabled={item.read}
              onClick={() => handleReadClick(index)}
            >
              {item.read ? '已经阅读' : '尚未阅读'}
            </Button>,
          ]}
        >
          <Skeleton avatar title={false} loading={initLoading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.desc}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
export default connect(({ message, count }) => ({
  message,
  count,
}))(MessageList);

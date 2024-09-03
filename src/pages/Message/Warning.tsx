import { Avatar, Badge } from 'antd';
import React from 'react';
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
  };
}
const Warning: React.FC<IProps> = (props) => {
  console.log(props);
  const { messageList } = props.message;
  return (
    <div>
      <Badge count={messageList.filter((item: DataType) => !item.read).length}>
        <Avatar
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          shape="square"
          size="large"
        />
      </Badge>
    </div>
  );
};

export default connect(({ message }) => ({ message }))(Warning);

import { EditOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Link } from '@umijs/max';
import { Button } from 'antd';
import React from 'react';

const Content: React.FC = () => {
  // const handleCreateClick = () => {
  //   console.log("aa")
  //   history.push("/editor")
  // };
  return (
    <PageContainer>
      <Button
        // onClick={handleCreateClick}
        icon={<EditOutlined style={{ fontSize: '20px' }} />}
        type="primary"
      >
        <Link to="/editor" target="_blank">开始创作</Link>
      </Button>
    </PageContainer>
  );
};

export default Content;

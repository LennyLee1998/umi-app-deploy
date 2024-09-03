import { postLogin } from '@/services/user';
import type { FormProps } from 'antd';
import { Button, Card, Checkbox, Col, Form, Input, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel, useNavigate, useRequest } from 'umi';

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};
const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
  const [remember, setRemember] = useState(false);
  // form
  const initialData = {
    remember,
    username: 'lenny',
    password: '123456',
  };
  const navigate = useNavigate();
  // 登录逻辑
  const { initialState, refresh, setInitialState } = useModel('@@initialState');
  // console.log(initialState);
  // const [state, setState] = useLocalStorageState(initialState)
  const { data, loading, error, run } = useRequest(postLogin, {
    manual: true,
    onSuccess(data, params) {
      console.log(params);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  // 跳转逻辑 & isLogin持久化存储
  useEffect(() => {
    if (data) {
      if (remember) {
        localStorage.setItem('userInfo', JSON.stringify(data));
      } else {
        sessionStorage.setItem('userInfo', JSON.stringify(data));
      }
      // {username: "lenny"}
      setInitialState({ isLogin: true, userInfo: data }).then(() => {
        navigate('/');
      });
      // localStorage.setItem(
      //   'state',
      //   JSON.stringify({ isLogin: true, userInfo: data }),
      // );
    }
  }, [data]);
  
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await run(values);
      setRemember(values.remember as boolean);
    } catch (error) {}
    // console.log(initialState);
    // console.log('Success:', values);
  };

  return (
    <Row style={{ height: '100vh', background: '#f6f6f6' }} align="middle">
      <Col span={8} offset={8}>
        <Card
          title="请登录"
          // extra={<a href="#">More</a>}
          // style={{ width: 300 }}
        >
          <Form
            name="basic"
            labelCol={{ span: 6 }}
            // wrapperCol={{ span:  }}
            style={{
              maxWidth: 800,
              // textAlign: "center"
            }}
            initialValues={initialData}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;

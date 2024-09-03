import { getAllRolesApi, newAccountApi } from '@/services/user';
import { Button, Form, Input, Select, Space, Spin, message } from 'antd';
import React from 'react';
import { useRequest } from 'umi';

const layout = {
  // label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Account: React.FC = () => {
  const [form] = Form.useForm();
  const { data: allRoles } = useRequest(getAllRolesApi);
  const { loading, run } = useRequest(
    (values) => {
      console.log(values);
      return newAccountApi(values);
    },
    {
      manual: true,
      onError: (error) => {
        message.error(error?.response.data.message);
      },
    },
  );
  const onFinish = async (values: any) => {
    try {
      await run(values);
    } catch (error) {
      console.log(error);
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="username" label="账号" rules={[{ required: true }]}>
          <Input placeholder="Input your username" />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input placeholder="Input your password" />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ required: true }]}>
          <Input placeholder="Input your email" />
        </Form.Item>
        <Form.Item name="role" label="角色" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            showSearch
            placeholder="Select a role"
            optionFilterProp="label"
            onSearch={onSearch}
            options={allRoles?.map((role: any) => ({
              label: role.name,
              value: role.description,
            }))}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default Account;

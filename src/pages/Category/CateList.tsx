import { addCateApi } from '@/services/cake';
import { Button, Form, Input, Space, Spin } from 'antd';
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

const CateList: React.FC = () => {
  const [form] = Form.useForm();
  console.log(form);
  const { loading, run } = useRequest(
    (values) => {
      console.log(values);
      return addCateApi(values);
    },
    { manual: true },
  );
  const onFinish = async (values: any) => {
    run(values);
    // try {
    //   const res = await addCateApi(values);
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const onReset = () => {
    form.resetFields();
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
        <Form.Item
          name="categoryName"
          label="分类名称"
          rules={[{ required: true }]}
        >
          <Input />
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

export default CateList;

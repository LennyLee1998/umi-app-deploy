import ImgUpload from '@/components/Form/ImgUpload';
import { editBannerApi, postUploadBannerApi } from '@/services/banner';
import type { DataType } from '@/types';
import { Button, Form, Input, Space, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useRequest } from 'umi';

const layout = {
  // label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
interface BannerFormProps {
  initialValue?: DataType;
  type?: string;
}
const BannerForm: React.FC<BannerFormProps> = ({
  initialValue,
  type = 'add',
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // set 成功以后的回调
  const { data, loading, run } = useRequest(
    (values) => {
      // console.log({ ...initialValue, ...values });
      if (type === 'edit') {
        return editBannerApi({ ...initialValue, ...values });
      } else {
        return postUploadBannerApi(values);
      }
    },
    {
      manual: true,
      onSuccess: (result) => {
        if (!result) {
          // navigate('/banner/list');
          navigate(-1)
        }
      },
    },
  );
  useEffect(() => {
    form.setFieldsValue(initialValue);
  }, [initialValue]);

  // 检验成功的回调
  // submit会调用这个
  const onFinish = async (values: any) => {
    console.log(values)
    run(values);
  };

  // 1. 想把imgUpload里面的imageURL传给list,
  // 方法二: 把子组件里面的imgURL传给list

  const onReset = () => {
    form.resetFields();
  };

  // const handleInputChange = (e: any) => {
  //   console.log(e.target.files);
  // };

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
          name="bannerName"
          label="活动名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="bannerLink"
          label="活动链接"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="imgUrl" label="封面图片" rules={[{ required: true }]}>
          <ImgUpload />
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
        {/* <input type="file" multiple onChange={handleInputChange} /> */}
      </Form>
    </Spin>
  );
};

export default BannerForm;

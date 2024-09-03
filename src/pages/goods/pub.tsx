import MyEditor from '@/components/Editor';
import { getAllCategoriesApi } from '@/services/cake';
import { uploadManyGoodsApi } from '@/services/goods';
import { Button, Form, Select, Space, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';

const layout = {
  // label 标签布局，同 <Col> 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface CateDataType {
  _id: string;
  categoryName: string;
}
interface OptionType {
  label: string;
  value: string;
}
const GoodsPub: React.FC = () => {
  const [form] = Form.useForm();
  const [selectCate, setSelectCate] = useState<OptionType[]>();

  const { loading } = useRequest(
    () => {
      // console.log(values);
      return getAllCategoriesApi();
    },
    {
      onSuccess: (data: []) => {
        const newSelectCate = data.map((cate: CateDataType) => ({
          label: cate.categoryName,
          value: cate._id,
        }));
        setSelectCate(newSelectCate);
      },
    },
  );

  const onFinish = async (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  let [page, setPage] = useState(0);
  const bidArr = [1, 11, 6, 5];
  let [currentIndex, setCurrentIndex] = useState(0);
  const bid = bidArr[currentIndex];
  let totalCount = 0;
  const getPageGoodsData = () => {
    return axios.get(
      `/cake/api/0434b49d1ac28f9d?cityId=110&page=${page}&bid=${bid}`,
      {
        headers: {
          'access-token': '83af23e4a4299f57f1c1af5510b20559',
          version: 'v1.0',
        },
      },
    );
  };
  useEffect(() => {
    if (page && currentIndex < bidArr.length) {
      getPageGoodsData().then(async (res) => {
        try {
          await uploadManyGoodsApi(res.data.data.list);
          totalCount = res.data.data.count;
          if (page * 8 < totalCount) {
            setPage(++page);
          } else {
            setPage(1);
            setCurrentIndex(++currentIndex);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, [page, bid]);
  const onStore = async () => {
    setPage(++page);
  };

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 800 }}
      >
        <Form.Item
          name="categoryId"
          label="分类选择"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            placeholder="Select a category"
            optionFilterProp="label"
            onSearch={onSearch}
            options={selectCate}
          />
        </Form.Item>
        <Form.Item
          name="goodsDesc"
          label="商品详情"
          rules={[{ required: true }]}
        >
          <MyEditor />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button onClick={onStore}>批量转存</Button>
          </Space>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default GoodsPub;

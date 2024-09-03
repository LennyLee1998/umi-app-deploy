import { deleteBannerApi, getAllBannerApi } from '@/services/banner';
import type { DataType } from '@/types';
import { useUpdate } from 'ahooks';
import type { TableProps } from 'antd';
import { Button, Image, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAccess, useNavigate } from 'umi';

// @connect(({ cake }) => ({
//   banner,
// }))
const BannerList: React.FC = () => {
  console.log('aaa');
  const [bannerList, setBannerList] = useState();
  useEffect(() => {
    getAllBannerApi().then((res) => {
      // console.log(res);
      setBannerList(res.data);
    });
  }, []);
  // const {
  //   data = [],
  //   loading,
  // refresh,
  // } = useRequest(getAllBannerApi);
  const access = useAccess();
  const update = useUpdate();
  const handleDeleteClick = async (bannnerId: string) => {
    try {
      await deleteBannerApi(bannnerId);
      // refresh();
      // update();
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleEditClick = (record: DataType) => {
    navigate(`/banner/edit/${record._id}`, {
      state: record,
    });
  };
  const handleNewPageClick = () => {
    update();
  };
  const columns: TableProps<DataType>['columns'] = [
    {
      // header title
      title: 'AId',
      // data中的名称
      dataIndex: '_id',
      key: 'articleId',
      render: (text) => <a style={{ color: 'blue' }}>{text}</a>,
    },
    {
      // header title
      title: 'Name',
      // data中的名称
      dataIndex: 'bannerName',
      key: 'bannerName',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Link',
      dataIndex: 'bannerLink',
      key: 'bannerLink',
      render: (url) => (
        <a style={{ color: 'blue' }} target="blank" href={url}>
          点击预览
        </a>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      render: (text) => <Image width={50} src={text} />,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => (
        <Space size="middle">
          {access.isRoot && (
            <Button
              onClick={() => handleEditClick(record)}
              type="primary"
              size="small"
            >
              Edit
            </Button>
          )}
          <Button
            onClick={() => {
              handleDeleteClick(record._id);
            }}
          >
            Delete
          </Button>
          <Button onClick={handleNewPageClick}>new</Button>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={bannerList} rowKey="_id" />;
};

export default BannerList;

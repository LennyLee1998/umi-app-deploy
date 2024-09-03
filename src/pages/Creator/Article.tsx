import { deleteArticleApi, getArticlesApi } from '@/services/article';
import type { TableProps } from 'antd';
import { Button, Space, Table } from 'antd';
import React from 'react';
import { useRequest } from 'umi';
interface DataType {
  _id: string;
  title: string;
  createdAt: string;
  articleData: {
    showCount: number;
    readCount: number;
    greatCount: number;
    commentCount: number;
    favoriteCount: number;
  };
  content: string;
  isFavorite: boolean;
}

// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

const Article: React.FC = () => {
  // const [articleData, setArticleData] = useState<DataType[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const getArticles = async () => {
  // try {
  // 方法一
  // setIsLoading(true);
  // const res = await getArticlesApi();
  // console.log(res);
  // setIsLoading(false);
  // setArticleData(res.data);
  // } catch (err) {
  // console.log(err);
  // }
  // };
  // useEffect(() => {
  // getArticles();
  // }, []);
  const {
    data = [],
    loading,
    refresh,
  } = useRequest(() => {
    return getArticlesApi();
  });
  // console.log(data)
  const handleDeleteClick = async (articleId: string) => {
    try {
      await deleteArticleApi(articleId);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      // header title
      title: 'AId',
      // data中的名称
      dataIndex: '_id',
      key: 'articleId',
      render: (text) => <a>{text}</a>,
    },
    {
      // header title
      title: 'Title',
      // data中的名称
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      // render: (text) => {
      //   <p>{}</p>;
      // },
    },
    {
      title: 'Favorite',
      dataIndex: 'isFavorite',
      key: 'isFavorite',
      render: (isFavo) => <Button>{isFavo ? 'like' : 'unlike'}</Button>,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" size="small">
            Edit
          </Button>
          <Button
            onClick={() => {
              handleDeleteClick(record._id);
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={data} rowKey="_id" loading={loading} />
  );
};

export default Article;

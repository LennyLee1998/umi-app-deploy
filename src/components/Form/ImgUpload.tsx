import { uploadGoodsImgApi } from '@/services/goods';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import { Flex, message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';

// FileType类型，它是从Ant Design的UploadProps中提取的beforeUpload函数参数的类型。这个类型用于后续的文件类型检查。
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// 定义了一个getBase64函数，该函数接收一个文件对象和一个回调函数作为参数。它的作用是将文件转换为Base64编码的字符串，并通过回调函数返回这个字符串。
const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

// beforeUpload函数用于在上传文件之前对文件进行验证。它检查文件是否为JPG或PNG格式，以及文件大小是否小于2MB。如果文件不符合这些条件，会显示错误消息。
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

// interface ImgUploadProps {
//   onChange: (value: string) => void;
//   value: string;
// }
const ImgUpload: React.FC = (props: any) => {
  // console.log(props.onChange);
  const { onChange, value } = props;
  // ImgUpload组件使用useState Hook来管理loading和imageUrl两个状态。loading用于指示上传是否正在进行，而imageUrl用于存储上传后图片的URL。
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  useEffect(() => {
    setImageUrl(value);
  }, [value]);

  // 组件的handleChange函数处理上传过程中的状态变化。当文件上传开始时，设置loading为true；当上传完成时，使用getBase64函数获取图片的Base64编码，并通过回调函数更新imageUrl状态，同时将loading设置回false。
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        console.log(info, url);
        setLoading(false);
        setImageUrl(url);
        // onSetImgURL('imgUrl', url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {/* 通过loading判断图标显示plus还是loading */}
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const cumstomUpload: UploadProps['customRequest'] = async (info) => {
    setLoading(true);
    // console.log(info);
    getBase64(info.file as FileType, async (url) => {
      setLoading(false);
      console.log(info);
      try {
        const uploadRes = await uploadGoodsImgApi(url);
        const requestUrl = uploadRes.data.url;
        setImageUrl(requestUrl);
        onChange(requestUrl);
        console.log(uploadRes);
      } catch (err) {
        console.log(err);
      }

      // console.log(requestUrl);
    });
  };
  return (
    // 组件返回一个包含Upload组件的Flex布局。如果imageUrl存在，即图片已经上传成功，就显示该图片；否则，显示上传按钮。上传按钮会根据loading状态显示不同的图标，如果正在上传，则显示LoadingOutlined，否则显示PlusOutlined。
    <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // action属性是用来指定文件上传的目标URL。当用户选择文件后，Upload组件会将文件发送到这个URL进行上传。
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        customRequest={cumstomUpload}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {/* 有imgUrl显示img没有的话显示上传的button */}
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

export default ImgUpload;

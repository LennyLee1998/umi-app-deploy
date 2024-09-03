import BigFileUpload from '@/components/bigFile-Upload';
import { message } from 'antd';
import React, { useState } from 'react';
import { useUpdate } from 'ahooks';

const FileUpload = () => {
  console.log("aaa")
  const [file, setFile] = useState<File>();
  const [base64, setBase64] = useState<string>('');
  // 对传入的文件进行type和size限制, 使用两个变量进行验证的正确性
  const beforeUpload = (file: File) => {
    // 如果至少有一个操作数为 true，则返回 true。
    // 如果所有操作数都为 false，则返回 false。
    const isType =
      file?.type === 'application/pdf' ||
      file?.type === 'image/png' ||
      file?.type === 'image/jpeg';
    if (!isType) {
      message.error('请输入zip/png/jpg格式的文件');
    }
    // Blob 对象中所包含数据的大小 byte 1Mb = 1024Kb 1Kb = 1024byte
    console.log(file.size / 1024 / 1024);
    const isLimit2M = file.size / 1024 / 1024 < 2;
    if (!isLimit2M) {
      message.error('请输入2M以下的文件');
    }
    return isType && isLimit2M;
  };
  // 工具函数应该只做base64的事情, 用第二个callback来返回回调的结果
  // 异步如何返回一个结果 使用回调函数
  // 实参是在被调用, 形参是在被定义
  const readAsBase64 = (file: File, callback: (url: string) => void) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', (event) => {
      // console.log(event.target?.result);
      callback(event.target?.result as string);
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.files);

    // 将上传的file设置为state
    const currentFile = e.target.files?.[0];
    if (currentFile && beforeUpload(currentFile)) {
      setFile(currentFile);
      readAsBase64(currentFile, (url) => {
        setBase64(url);
      });
    } else {
      return;
    }
  };

  // click的ts类型
  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (file && beforeUpload(file as File)) {
      // 异步上传
    }
  };
  const update = useUpdate();

  const handleReset = () => {
    update();
  };
  return (
    <div>
      <BigFileUpload />
      <form style={{ marginTop: '20px' }}>
        {/* 选择文件 */}
        <input type="file" onChange={handleChange} />
        {/* 编码后的base64可以直接放在src里面用 */}
        <img style={{ width: '200px' }} src={base64} alt="" />
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default FileUpload;


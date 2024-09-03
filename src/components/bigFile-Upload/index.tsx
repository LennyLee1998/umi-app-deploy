//import { bigUpload } from '@/services/versionManager'; //上传文件的接口
import { postFileUploadApi } from '@/services/upload';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Progress, Upload } from 'antd';
import { useRef, useState } from 'react';
import SparkMD5 from 'spark-md5';

// 计算文件的 MD5 值
function calculateMD5(file: any) {
  const chunkSize = 5 * 1024 * 1024;
  const chunks = Math.ceil(file.size / chunkSize); // 文件划分成的分片数量
  return new Promise((resolve) => {
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();
    let currentChunk = 0;
    // 加载下一个分片
    function loadNext() {
      const start = currentChunk * chunkSize;
      const end = Math.min(file.size, start + chunkSize);
      const buffer = file.slice
        ? file.slice(start, end)
        : file.webkitSlice(start, end); // 使用 slice 方法
      fileReader.readAsArrayBuffer(buffer);
    }

    fileReader.onload = function (e: any) {
      spark.append(e.target.result);
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        const result = spark.end();
        resolve(result);
      }
    };

    loadNext(); // 开始加载第一个分片
  });
}

// 将文件划分成多个分片
function chunkFile(file: any, chunkSize: any) {
  const chunks = Math.ceil(file.size / chunkSize); // 文件划分成的分片数量
  const chunksList = [];
  let currentChunk = 0;

  while (currentChunk < chunks) {
    const start = currentChunk * chunkSize;
    const end = Math.min(file.size, start + chunkSize);
    const chunk = file.slice
      ? file.slice(start, end)
      : file.webkitSlice(start, end); // 使用 slice 方法
    chunksList.push(chunk); // 将分片添加到列表中
    currentChunk++;
  }

  return chunksList; // 返回分片列表
}

const BigFileUpload = () => {
  const [uploading, setUploading] = useState(false); // 是否正在上传文件的状态
  const [progress, setProgress] = useState(0); // 文件上传进度的状态
  const chunkRefs: any = useRef([]); // 保存分片引用的引用
  const md5Ref: any = useRef(''); // 保存 MD5 值的引用

  const handleFileChange = async ({ file }: any) => {
    setUploading(true); // 开始文件上传
    const md5 = await calculateMD5(file); // 计算文件的 MD5 值
    md5Ref.current = md5; // 保存 MD5 值到引用

    // 将文件划分成多个分片并保存到引用对象中
    const chunksList: any = chunkFile(file, 5 * 1024 * 1024);
    chunkRefs.current = chunksList.map((chunk: any, index: any) => {
      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('fileName', file.name);
      formData.append('totalPieces', chunksList.length);
      formData.append('sliceIndex', index.toString());
      formData.append('md5', md5Ref.current); // 添加 MD5 参数
      return formData;
    });

    // 定义递归函数用于逐个上传分片
    const uploadChunk = async (index: any) => {
      if (index >= chunkRefs.current.length) {
        // 所有分片上传完成
        message.success('文件上传成功！');
        setUploading(false); // 文件上传完成，修改上传状态
        return;
      }

      try {
        await postFileUploadApi(chunkRefs.current[index]); // 调用上传函数上传当前分片，此处为调用上传的接口
        console.log(`分片 ${index + 1} 上传成功`);
        // 更新进度条的值
        const newProgress = Math.ceil(
          ((index + 1) / chunkRefs.current.length) * 100,
        );
        setProgress(newProgress);
        // 递归调用上传下一个分片
        await uploadChunk(index + 1);
        return;
      } catch (error) {
        console.error(`分片 ${index + 1} 上传失败`, error);
        message.error('文件上传失败！');
        setUploading(false); // 文件上传失败，修改上传状态
        return;
      }
    };

    // 开始递归上传第一个分片
    await uploadChunk(0);
  };

  const handleRemove = () => {
    // 清空保存的分片引用、MD5 引用和重置进度条
    chunkRefs.current = [];
    md5Ref.current = '';
    setProgress(0);
  };

  return (
    <div>
      <Upload
        name="file"
        multiple={false}
        beforeUpload={() => false}
        onChange={handleFileChange}
        onRemove={handleRemove} // 添加自定义的删除操作
      >
        <Button loading={uploading} icon={<UploadOutlined />}>
          {uploading ? '上传中' : '选择文件'}
        </Button>
      </Upload>
      {uploading && <Progress percent={progress} status="active" />}
      {/* // 显示文件上传进度条 */}
    </div>
  );
};

export default BigFileUpload;

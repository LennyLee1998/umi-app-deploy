import OSS from 'ali-oss';

export const client = new OSS({
  bucket: 'img-upload-2024816', //bucket名称
  region: 'oss-cn-shanghai', //区域
  endpoint: 'oss-cn-shanghai.aliyuncs.com', //地域节点=> 外网访问
  accessKeyId: process.env.OSS_ACCESS_KEY_ID, //访问键id
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET, //访问密钥
  secure: false, //http就是false, https就是true
});

// export const objectMetadata = new ObjectMetadata();

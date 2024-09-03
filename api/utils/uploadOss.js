const OSS = require("ali-oss");
require("dotenv").config();

// 初始化OSS客户端。请将以下参数替换为您自己的配置信息。
const client = new OSS({
  region: "oss-cn-shanghai", // 示例：'oss-cn-hangzhou'，填写Bucket所在地域。
  accessKeyId: process.env.OSS_ACCESS_KEY_ID, // 确保已设置环境变量OSS_ACCESS_KEY_ID。
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET, // 确保已设置环境变量OSS_ACCESS_KEY_SECRET。
  endpoint: "oss-cn-shanghai.aliyuncs.com",
  bucket: "img-upload-2024816", // 示例：'my-bucket-name'，填写存储空间名称。
  secure: false,
});

async function uploadAndDownloadFile(fileName, filePath) {
  try {
    // 上传文件到OSS，'object'是OSS中的文件名，'localfile'是本地文件的路径。
    const uploadResult = await client.put(fileName, filePath);
    console.log("上传成功:", uploadResult);
    // 从OSS下载文件以验证上传成功。
    // const getResult = await client.get("object");
    return uploadResult;
  } catch (error) {
    console.error("发生错误:", error);
    // 在此处添加错误处理逻辑。
  }
}

module.exports = uploadAndDownloadFile;

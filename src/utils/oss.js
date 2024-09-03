import { client } from '@/config';
import { nanoid } from 'nanoid';
const tool = {
  oss: {
    async upload(file) {
      // my-img-world/4vVSKFHYTk6Es_TJOdyZp.jpg
      // 文件名
      const uuid = nanoid();
      // 文件后缀名  name: "logo.png" 得到.的index
      // const index = file.name.lastIndexOf('.');
      // 返回该字符串从起始索引到结束索引（不包括）的部分 .png
      // const suffix = file.name.substring(index+1)
      const suffix = file.name.split('.')[1];
      console.log(suffix, file.name.split('.'));
      // 完整路径
      let fileName = 'my-img-world/' + uuid + '.' + suffix;
      console.log(fileName);

      // console.log(11, file, client, uuid);
      // 如果您希望避免文件覆盖，可以考虑在上传时重命名文件或使用唯一标识符（如时间戳或 UUID）来生成不同的文件名。

      try {
        const meta = {
          headers: {
            'Content-Type': 'image/jpg',
          },
        };
        // const result = await client.putMeta(fileName, meta);
        // console.log(result);
        return await client.multipartUpload(fileName, file, {
          progress: function (p) {
            console.log(p);
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default tool;

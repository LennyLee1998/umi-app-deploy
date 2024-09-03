const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
// 创建应用
// app 和 server 都是使用 Express 框架创建的 HTTP 服务器实例
// app 是主要的 Express 应用程序实例，它处理所有的 API 请求和业务逻辑。它配置了中间件（如 CORS 和解析请求体的中间件），并定义了 API 路由（如 /article/list）
const app = express();

// 允许跨域
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// 接口测试
app.get("/article/list", (req, res) => {
  res.json({
    code: 200,
    data: "Hello world",
    message: "获取数据成功",
  });
});
const config = require("./config.json");
// 连接数据库
mongoose.connect(config.connectionString);

// article
const articleApi = require("./apis/article");
articleApi(app);
// Category
const catogoryApi = require("./apis/category");
catogoryApi(app);
// banner
const bannerApi = require("./apis/banner");
bannerApi(app);

// goods
const goodsApi = require("./apis/goods");
goodsApi(app);

// 图片 => oss
const uploadAndDownloadFile = require("./utils/uploadOss");
app.post("/upload-goods-img", async (req, res) => {
  const { nanoid } = await import("nanoid");
  const { base64Data } = req.body;
  const uuid = nanoid();
  // 从一个包含 Base64 编码图片数据的字符串 base64Data 中提取图片的 MIME 类型（如 image/png、image/jpeg 等）。
  // 匹配以 data:image/ 开头，后面跟着任意字符（非贪婪模式），最后以 ; 结尾的字符串。
  const regex = /^data:image\/(.*?);/;
  const match = base64Data.match(regex);
  // 如果匹配成功，match 将是一个数组，其中第一个元素是整个匹配到的字符串（如 data:image/png;base64,），第二个元素是括号内捕获的内容（如 png）。通过这个捕获的内容，我们可以知道图片的 MIME 类型。
  // 如果 base64Data 是 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...，那么 match 的值将是 ["data:image/png;base64,", "png"]。
  const suffix = match[1];
  const fileName = "my-img-world/" + uuid + "." + suffix;
  if (!base64Data) {
    return res.status(400).json({ error: "Missing base64Data" });
  }
  
  try {
    // 去掉base64前缀标识
    const base64Image = base64Data.split(";base64,")[1];
    // 将一个 Base64 编码的字符串 base64Image 转换为一个 Buffer 对象。
    // Buffer 是 Node.js 中用于处理二进制数据的类
    // 通过使用 Buffer.from() 方法并指定编码为 "base64"，可以将这个字符串解码为一个 Buffer 对象，从而方便后续对二进制数据的处理，例如保存到文件、发送网络请求等。
    // https://nodejs.cn/api/buffer.html#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95bufferfromstring-encoding
    // 创建包含 string 的新 Buffer。encoding 参数标识将 string 转换为字节时要使用的字符编码。
    const buffer = Buffer.from(base64Image, "base64");
    // console.log(buffer);
    const uploadResult = await uploadAndDownloadFile(fileName, buffer);
    // console.log(uploadResult);
    return res.json({
      code: 200,
      data: uploadResult,
      message: "Upload Image Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

// user
const jwt = require("jsonwebtoken");
const authenticateToken = require("./utils/authenticateToken");

// login会签发token
const User = require("./model/permission/user.model");
app.post("/login", async (req, res) => {
  const { username, password, remember } = req.body;
  if (!username)
    return res
      .status(400)
      .json({ error: true, message: "username is required" });
  if (!password)
    return res
      .status(400)
      .json({ error: true, message: "password is required" });
  const userInfo = await User.findOne({ username });
  if (!userInfo) {
    return res.status(400).json({ error: true, message: "User not found" });
  }
  if (username === userInfo.username && password === userInfo.password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    // 创建一个不带 password 的用户对象  
    // userInfo 是一个 Mongoose 模型实例，通常包含数据库中的文档数据。
    // toObject() 方法将 Mongoose 文档转换为一个普通的 JavaScript 对象。这使得我们可以更方便地操作这个对象，比如删除某些属性。
    const { password: _, ...userWithoutPassword } = userInfo.toObject(); 
    // console.log(userWithoutPassword);
    return res.json({
      code: 200,
      data: userWithoutPassword,
      accessToken,
      message: "login seccessfully",
    });
  } else {
    // user失败
    return res
      .status(400)
      .json({ error: true, message: "Invalid Credentials" });
  }
});
// 大文件上传
app.post("/file-upload", async (req, res) => {
  req.body = "ok";
});

// permission
const permissionApi = require("./apis/permission");
permissionApi(app);
// 静态资源服务器
const http = require("node:http");

const fs = require("fs");
const html = fs.readFileSync("./index.html");

// server 是一个简单的 HTTP 服务器，它不处理任何 API 请求，只是提供一个静态的 HTML 页面。这个服务器监听 3000 端口。
const server = http.createServer((req, res) => {
  // res.end(html);
  // res是一个可写流, 所以通过fs创建一个可读流, 然后pipe到res, 性能比上面的要高一些
  fs.createReadStream("./index.html").pipe(res);
});

// server.listen(3000, () => {
//   console.log("server listening 3000");
// });
app.listen(8989, () => {
  console.log("server is running");
});

module.exports = app;

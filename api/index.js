const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
// 创建应用
// app 和 server 都是使用 Express 框架创建的 HTTP 服务器实例
// app 是主要的 Express 应用程序实例，它处理所有的 API 请求和业务逻辑。它配置了中间件（如 CORS 和解析请求体的中间件），并定义了 API 路由（如 /article/list）
const app = express();
require('dotenv').config();

// 允许跨域
app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));

// 接口测试
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// // });
// app.get('/data', (req, res) => {
//   res.send('data');
// });
const config = require('./config.json');
// 连接数据库
mongoose.connect(process.env.connectionString ?? config.connectionString);

// article
// creator
const Article = require('./model/article.model');
// get-articles
app.get('/api/get-articles', async (req, res) => {
  try {
    console.log(process.env.ACCESS_TOKEN_SECRET);

    const articles = await Article.find().sort({ createdAt: -1 });
    return res.json({
      code: 200,
      data: articles,
      message: 'articles retrived successfully',
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});
// delete-article
app.delete('/api/delete-article/:articleId', async (req, res) => {
  const { articleId } = req.params;
  try {
    const article = await Article.find({ _id: articleId });
    if (!article)
      return res.status(400).json({
        code: 400,
        message: 'Bad Request',
      });
    await Article.deleteOne({ _id: articleId });
    return res.status(200).json({
      code: 200,
      message: 'article deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});
// add-article
app.post('/api/add-article', async (req, res) => {
  // console.log(req.body);
  const { title, articleData, content, isFavorite } = req.body;
  // if ()
  const article = new Article({ title, articleData, content, isFavorite });
  try {
    const artRes = await article.save();
    return res.json({
      code: 200,
      data: artRes,
      message: 'add successfully',
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

// Category
const Category = require('./model/catogory.model');
app.post('/api/classes/category', async (req, res) => {
  const { categoryName } = req.body;
  try {
    const isExisted = await Category.find({ categoryName });
    if (isExisted.length)
      return res
        .status(409)
        .json({ code: 409, message: 'category already existed' });
    const category = new Category({ categoryName });
    const result = await category.save();
    return res.json({
      code: 200,
      data: result,
      message: 'category add successfully',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});
app.get('/api/get-all-categories', async (req, res) => {
  try {
    const allCategories = await Category.find();
    return res.json({
      code: 200,
      data: allCategories,
      message: 'Get All Categories Successfully',
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

// banner
const Banner = require('./model/banner.model');
app.post('/api/upload-banner', async (req, res) => {
  const { bannerName, bannerLink, imgUrl } = req.body;
  if (!bannerName) {
    return res.status(400).json({
      code: 400,
      message: 'BannerName is Required',
    });
  }
  if (!bannerLink) {
    return res.status(400).json({
      code: 400,
      message: 'BannerLink is Required',
    });
  }
  if (!imgUrl) {
    return res.status(400).json({
      code: 400,
      message: 'ImgUrl is Required',
    });
  }
  const banner = new Banner({ bannerName, bannerLink, imgUrl });
  try {
    const result = await banner.save();
    // console.log("res", res);
    return res.json({
      code: 200,
      data: result,
      message: 'banner added successfully',
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Internel Server Error',
    });
  }
});
app.get('/api/get-all-banners', async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    return res.json({
      code: 200,
      data: banners,
      message: 'Get All Banners Successfully',
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});
app.put('/api/edit-banner/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const banner = await Banner.findOne({ _id: id });
    // console.log(banner, id, body);
    if (!banner) {
      return res.status(404).json({
        code: 404,
        message: 'Banner Not Found',
      });
    }
    // $set 是一个操作符，用于更新文档的某些字段而不改变其他字段的值。它在更新操作中非常有用，可以确保只修改你想要改变的部分。
    const bannerRes = await Banner.updateOne(
      { _id: id },
      { $set: { ...body } },
    );
    return res.json({
      code: 200,
      message: 'Banner Updated Successfully',
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});
app.delete('/api/delete-banner/:id', async (req, res) => {
  const { id } = req.params;
  const banner = await Banner.findById({ _id: id });
  if (!banner) {
    return res.status(400).json({
      code: 400,
      message: 'deleted failed',
    });
  }
  await Banner.findByIdAndDelete({ _id: id });
  return res.json({
    code: 200,
    message: 'Banner deleted Successfully',
  });
});
// goods
const Goods = require('./model/goods.model');
app.post('/api/goods/many-trans', async (req, res) => {
  const { goodsData } = req.body;
  // console.log(goodsData);
  try {
    const result = await Goods.insertMany(goodsData);
    console.log(result);
    return res.json({
      code: 200,
      data: result,
      message: 'goods add successfully',
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
    });
  }
});

// 图片 => oss
const uploadAndDownloadFile = require('./utils/uploadOss');
app.post('/api/upload-goods-img', async (req, res) => {
  const { nanoid } = await import('nanoid');
  const { base64Data } = req.body;
  const uuid = nanoid();
  // 从一个包含 Base64 编码图片数据的字符串 base64Data 中提取图片的 MIME 类型（如 image/png、image/jpeg 等）。
  // 匹配以 data:image/ 开头，后面跟着任意字符（非贪婪模式），最后以 ; 结尾的字符串。
  const regex = /^data:image\/(.*?);/;
  const match = base64Data.match(regex);
  // 如果匹配成功，match 将是一个数组，其中第一个元素是整个匹配到的字符串（如 data:image/png;base64,），第二个元素是括号内捕获的内容（如 png）。通过这个捕获的内容，我们可以知道图片的 MIME 类型。
  // 如果 base64Data 是 data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...，那么 match 的值将是 ["data:image/png;base64,", "png"]。
  const suffix = match[1];
  const fileName = 'my-img-world/' + uuid + '.' + suffix;
  if (!base64Data) {
    return res.status(400).json({ error: 'Missing base64Data' });
  }

  try {
    // 去掉base64前缀标识
    const base64Image = base64Data.split(';base64,')[1];
    // 将一个 Base64 编码的字符串 base64Image 转换为一个 Buffer 对象。
    // Buffer 是 Node.js 中用于处理二进制数据的类
    // 通过使用 Buffer.from() 方法并指定编码为 "base64"，可以将这个字符串解码为一个 Buffer 对象，从而方便后续对二进制数据的处理，例如保存到文件、发送网络请求等。
    // https://nodejs.cn/api/buffer.html#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95bufferfromstring-encoding
    // 创建包含 string 的新 Buffer。encoding 参数标识将 string 转换为字节时要使用的字符编码。
    const buffer = Buffer.from(base64Image, 'base64');
    // console.log(buffer);
    const uploadResult = await uploadAndDownloadFile(fileName, buffer);
    // console.log(uploadResult);
    return res.json({
      code: 200,
      data: uploadResult,
      message: 'Upload Image Successfully',
    });
  } catch (error) {
    console.log(error);
  }
});

// user
const jwt = require('jsonwebtoken');
const authenticateToken = require('./utils/authenticateToken');

// login会签发token
const User = require('./model/user.model');
app.post('/api/login', async (req, res) => {
  const { username, password, remember } = req.body;
  if (!username)
    return res
      .status(400)
      .json({ error: true, message: 'username is required' });
  if (!password)
    return res
      .status(400)
      .json({ error: true, message: 'password is required' });
  const userInfo = await User.findOne({ username });
  if (!userInfo) {
    return res.status(400).json({ error: true, message: 'User not found' });
  }
  if (username === userInfo.username && password === userInfo.password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '36000m',
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
      message: 'login seccessfully',
    });
  } else {
    // user失败
    return res
      .status(400)
      .json({ error: true, message: 'Invalid Credentials' });
  }
});
// 大文件上传
app.post('/api/file-upload', async (req, res) => {
  req.body = 'ok';
});

// permission
const Role = require('./model/role.model');

// user
app.post('/api/create-user', async (req, res) => {
  const { username, password, email, role } = req.body;
  // console.log(role);
  if (!username) {
    return res
      .status(400)
      .json({ error: true, message: 'username is required' });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: 'password is required' });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: 'email is required' });
  }
  if (!role) {
    return res.status(400).json({ error: true, message: 'role is required' });
  }

  try {
    const isUser = await User.findOne({ email });
    if (isUser)
      return res.status(400).json({
        code: 400,
        message: 'User Already Existed',
      });
    const user = new User({ username, password, email, role });
    await user.save();
    // const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    //   expiresIn: "36000m",
    // });
    return res.status(200).json({
      code: 200,
      data: user,
      // accessToken,
      message: 'User Created Successfully',
    });
  } catch (error) {
    console.log(error);
  }
});

// role
// 增加角色
app.post('/api/add-role', async (req, res) => {
  const { name, description } = req.body.role;
  // 表单验证
  if (!name) {
    return res.status(400).json({
      code: 400,
      message: 'Name is required',
    });
  }
  if (!description) {
    return res.status(400).json({
      code: 400,
      message: 'Description is required',
    });
  }
  const role = new Role({ name, description });
  await role.save();
  return res.json({
    code: 200,
    data: role,
    message: 'Role Created Successfully',
  });
});
// 获取角色
app.get('/api/get-all-roles', async (req, res) => {
  const roles = await Role.find();
  return res.json({
    code: 200,
    data: roles,
    message: 'Get All Roles Successfully',
  });
});

// 静态资源服务器
app.listen(3000, () => {
  console.log('server is running');
});

module.exports = app;

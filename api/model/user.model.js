const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    // 什么意思
    // 这是Mongoose提供的一个数据类型，用于表示MongoDB中的ObjectId。ObjectId是一个12字节的唯一标识符，通常用于在文档之间创建引用关系。
    // `ref: 'Role'`：这部分代码指定了`role`字段引用的另一个模型，即`Role`模型。这意味着存储在`role`字段中的ObjectId实际上是`Role`集合中某个文档的_id。
    role: [{ type: String, ref: "Role" }],
    email: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const Role = require("../model/permission/role.model");
const User = require("../model/permission/user.model");

function permissionApi(app) {
  // user
  app.post("/create-user", async (req, res) => {
    const { username, password, email, role } = req.body;
    // console.log(role);
    if (!username) {
      return res
        .status(400)
        .json({ error: true, message: "username is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "password is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ error: true, message: "email is required" });
    }
    if (!role) {
      return res.status(400).json({ error: true, message: "role is required" });
    }

    try {
      const isUser = await User.findOne({ email });
      if (isUser)
        return res.status(400).json({
          code: 400,
          message: "User Already Existed",
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
        message: "User Created Successfully",
      });
    } catch (error) {
      console.log(error);
    }
  });

  // role
  // 增加角色
  app.post("/add-role", async (req, res) => {
    const { name, description } = req.body.role;
    // 表单验证
    if (!name) {
      return res.status(400).json({
        code: 400,
        message: "Name is required",
      });
    }
    if (!description) {
      return res.status(400).json({
        code: 400,
        message: "Description is required",
      });
    }
    const role = new Role({ name, description });
    await role.save();
    return res.json({
      code: 200,
      data: role,
      message: "Role Created Successfully",
    });
  });
  // 获取角色
  app.get("/get-all-roles", async (req, res) => {
    const roles = await Role.find();
    return res.json({
      code: 200,
      data: roles,
      message: "Get All Roles Successfully",
    });
  });
}

module.exports = permissionApi;

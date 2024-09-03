const Category = require("../model/catogory.model");
function catogoryApi(app) {
  app.post("/classes/category", async (req, res) => {
    const { categoryName } = req.body;
    try {
      const isExisted = await Category.find({ categoryName });
      if (isExisted.length)
        return res
          .status(409)
          .json({ code: 409, message: "category already existed" });
      const category = new Category({ categoryName });
      const result = await category.save();
      return res.json({
        code: 200,
        data: result,
        message: "category add successfully",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });
  app.get("/get-all-categories", async (req, res) => {
    try {
      const allCategories = await Category.find();
      return res.json({
        code: 200,
        data: allCategories,
        message: "Get All Categories Successfully",
      });
    } catch (error) {
      res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });
}

module.exports = catogoryApi;

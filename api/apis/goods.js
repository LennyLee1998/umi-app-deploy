const Goods = require("../model/goods.model");
function GoodsApi(app) {
  app.post("/goods/many-trans", async (req, res) => {
    const { goodsData } = req.body;
    // console.log(goodsData);
    try {
      const result = await Goods.insertMany(goodsData);
      console.log(result);
      return res.json({
        code: 200,
        data: result,
        message: "goods add successfully",
      });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });
}

module.exports = GoodsApi;

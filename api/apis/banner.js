// banner
// base64 => mongooDB
const Banner = require("../model/banner.model");
function bannerApi(app) {
  app.post("/upload-banner", async (req, res) => {
    const { bannerName, bannerLink, imgUrl } = req.body;
    if (!bannerName) {
      return res.status(400).json({
        code: 400,
        message: "BannerName is Required",
      });
    }
    if (!bannerLink) {
      return res.status(400).json({
        code: 400,
        message: "BannerLink is Required",
      });
    }
    if (!imgUrl) {
      return res.status(400).json({
        code: 400,
        message: "ImgUrl is Required",
      });
    }
    const banner = new Banner({ bannerName, bannerLink, imgUrl });
    try {
      const result = await banner.save();
      // console.log("res", res);
      return res.json({
        code: 200,
        data: result,
        message: "banner added successfully",
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: "Internel Server Error",
      });
    }
  });
  app.get("/get-all-banners", async (req, res) => {
    try {
      const banners = await Banner.find().sort({ createdAt: -1 });
      return res.json({
        code: 200,
        data: banners,
        message: "Get All Banners Successfully",
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });
  app.put("/edit-banner/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const banner = await Banner.findOne({ _id: id });
      // console.log(banner, id, body);
      if (!banner) {
        return res.status(404).json({
          code: 404,
          message: "Banner Not Found",
        });
      }
      // $set 是一个操作符，用于更新文档的某些字段而不改变其他字段的值。它在更新操作中非常有用，可以确保只修改你想要改变的部分。
      const bannerRes = await Banner.updateOne(
        { _id: id },
        { $set: { ...body } }
      );
      return res.json({
        code: 200,
        message: "Banner Updated Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });
  app.delete("/delete-banner/:id", async (req, res) => {
    const { id } = req.params;
    const banner = await Banner.findById({ _id: id });
    if (!banner) {
      return res.status(400).json({
        code: 400,
        message: "deleted failed",
      });
    }
    await Banner.findByIdAndDelete({ _id: id });
    return res.json({
      code: 200,
      message: "Banner deleted Successfully",
    });
  });
}

module.exports = bannerApi;

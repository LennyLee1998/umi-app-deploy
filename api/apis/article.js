// creator
const Article = require("../model/article.model");
// get-articles
function articleApi(app) {
  app.get("/get-articles", async (req, res) => {
    try {
      const articles = await Article.find().sort({ createdAt: -1 });
      return res.json({
        code: 200,
        data: articles,
        message: "articles retrived successfully",
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });
  // delete-article
  app.delete("/delete-article/:articleId", async (req, res) => {
    const { articleId } = req.params;
    try {
      const article = await Article.find({ _id: articleId });
      if (!article)
        return res.status(400).json({
          code: 400,
          message: "Bad Request",
        });
      await Article.deleteOne({ _id: articleId });
      return res.status(200).json({
        code: 200,
        message: "article deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });
  // add-article
  app.post("/add-article", async (req, res) => {
    // console.log(req.body);
    const { title, articleData, content, isFavorite } = req.body;
    // if ()
    const article = new Article({ title, articleData, content, isFavorite });
    try {
      const artRes = await article.save();
      return res.json({
        code: 200,
        data: artRes,
        message: "add successfully",
      });
    } catch (err) {
      return res.status(500).json({
        code: 500,
        message: "Internal Server Error",
      });
    }
  });
}

module.exports = articleApi;

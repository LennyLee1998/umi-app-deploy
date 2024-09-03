const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    articleData: {
      showCount: Number,
      readCount: Number,
      greatCount: Number,
      commentCount: Number,
      favoriteCount: Number,
    },
    content: String,
    isFavorite: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);

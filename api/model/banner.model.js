const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    bannerName: String,
    bannerLink: String,
    imgUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("banner", bannerSchema);

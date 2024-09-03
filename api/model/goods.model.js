const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema(
  {
    id: Number,
    twoId: Number,
    name: String,
    french: String,
    price: String,
    tid: Number,
    tname: String,
    timg: String,
    chineseBrief: String,
    fid: Number,
    fname: String,
    sid: Number,
    sname: String,
    saleTotal: Number,
    bcid: Number,
    bcname: String,
    weight: String,
    goodsTips: String,
    useFlg: Number,
    pprice: String,
    img: String,
    sku: String,
    spec: String,
    limg: String,
    fittings: String,
    list: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goods", goodsSchema);

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    // permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] // Permissions 关联
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);

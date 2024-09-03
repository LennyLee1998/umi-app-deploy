const mongoose = require('mongoose');  

const userRoleSchema = new mongoose.Schema({  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },  
  createdAt: { type: Date, default: Date.now }  
});  

module.exports = mongoose.model('UserRole', userRoleSchema);
/* 
对应users集合的Model
*/
const mongoose = require('mongoose')

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  pwd: {
    type: String,
    required: true,
  },
  age: Number,
  sex: String
})
// Model
const UserModel = mongoose.model('users', userSchema)

// 暴露Model
module.exports = UserModel
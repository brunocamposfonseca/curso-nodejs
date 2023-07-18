const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  birth: {
    type: String,
  },
  eAdmin: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model("user", Users);

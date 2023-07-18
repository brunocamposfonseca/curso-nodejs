const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Post = new Schema({
  title: {
    type: String,
    require: true
  },
  slug: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  category: {
    type: Schema.Types.ObjectId,
		ref: "categorias",
		required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("posts", Post);

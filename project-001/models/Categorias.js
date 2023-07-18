const mongoose = require('mongoose');

const Schema = mongoose.Schema

const Categorias = new Schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model("categorias", Categorias);

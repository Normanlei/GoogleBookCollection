const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  id: {type:String,required:true, unique:true},
  title: { type: String, required: true },
  authors: { type: Array, required: true, default:[]},
  description: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
});

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;

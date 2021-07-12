const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
  file: {
    type: String,
  },
  listItems: {
    type: Array,
  },
  location: {
    type: Object,
  },
  userid: {
    type: String,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);

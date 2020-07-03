const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  tree: {
    type: Schema.Types.ObjectId,
    ref: "trees"
  },
  text: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comments = mongoose.model("comments", CommentSchema);

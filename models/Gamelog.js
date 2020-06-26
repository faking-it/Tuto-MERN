const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameLogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String
  },
  action: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = GameLog = mongoose.model("gamelog", GameLogSchema);

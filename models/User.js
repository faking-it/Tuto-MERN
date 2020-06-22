const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  leaves: {
    type: Number
  },
  trees: {
    type: Number,
    default: 0
  }
});

// model() reçoit deux paramètres: un modèle "user" et un schéma UserSchema
module.exports = User = mongoose.model("user", UserSchema);

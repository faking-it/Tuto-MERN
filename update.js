const mongoose = require("mongoose");
const User = require("./models/User");
const Tree = require("./models/Trees");
mongoose
  .connect(
    "mongodb+srv://dbUser:321-Kenya@cluster0-dmk7u.gcp.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
Tree.find()
  .then((trees) => {
    for (let i = 0; i < trees.length; i++) {
      trees[i].color = "";
      trees[i].save((err, doc) => {
        if (err) return console.error(err);
        return console.log(trees[i].color);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });

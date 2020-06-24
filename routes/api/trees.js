const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Tree = require("../../models/Trees");
const User = require("../../models/User");

router.get("/get", (req, res) => {
  Tree.find()
    .then((trees) => {
      let geoloc = [];
      for (let i = 0; i < 100; i++) {
        geoloc.push(trees[i]);
      }
      res.send(geoloc);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.post("/buy", auth, async function (req, res) {
  const lati = req.body.lat;
  const long = req.body.lon;
  console.log(req.user.id);
  try {
    const tree = await Tree.findOne({ geoloc: { lat: lati, lon: long } });
    const user = await User.findById(req.user.id);
    const newLeaves = user.leaves - tree.leaves;
    if (newLeaves >= 0 && tree.owner != user.name) {
      const updateMoney = await user.updateOne({ leaves: newLeaves });
      const updateOwner = await tree.updateOne({ owner: user.name });
      res.send("success");
    } else {
      res.send("error");
    }

    // console.log(user);
    //console.log(tree);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

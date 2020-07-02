const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Tree = require("../../models/Trees");
const User = require("../../models/User");

const { insideCircle } = require("geolocation-utils");

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
  try {
    const tree = await Tree.findOne({ geoloc: { lat: lati, lon: long } });
    const user = await User.findById(req.user.id);
    const newLeaves = user.leaves - tree.leaves;
    if (tree.lock === true) {
      res
        .status(404)
        .send("This tree has been locked by his owner, you can't buy it.");
      return;
    }
    if (newLeaves < 0) {
      res.status(404).send("You have not enough money to buy this tree");
      return;
    }
    if (tree.owner === user.name) {
      res.status(404).send("This tree is already yours");
      return;
    }
    const updateMoney = await user.updateOne({ leaves: newLeaves });
    const updateOwner = await tree.updateOne({ owner: user.name });
    const treeUpdated = await Tree.findOne({
      geoloc: { lat: lati, lon: long },
    });
    res.send(treeUpdated);
  } catch (err) {
    console.log(err);
  }
});
router.post("/lock", auth, async function (req, res) {
  const lati = req.body.lat;
  const long = req.body.lon;
  const center = { lat: lati, lon: long };
  const radius = 100;
  try {
    const allTrees = await Tree.find();
    const tree = await Tree.findOne({ geoloc: { lat: lati, lon: long } });
    const user = await User.findById(req.user.id);
    if (user.name != tree.owner) {
      res.status(404).send("You should own this tree to be able to lock it.");
      return;
    }
    let treesAround = [];
    allTrees.forEach((element) => {
      const lat = element.geoloc.lat;
      const lon = element.geoloc.lon;
      if (insideCircle({ lat, lon }, center, radius)) {
        treesAround.push(element);
      }
    });
    let allLeaves = [];
    let allPlayers = [];
    let allPlayersTree = [];
    treesAround.forEach((element) => {
      allLeaves.push(element.leaves);
      if (element.owner != "") {
        allPlayersTree.push(element.leaves);
        allPlayers.push(element.owner);
      }
    });
    const set = new Set(allPlayers);
    const sizeSet = set.size;
    if (sizeSet === 0) {
      sizeSet = 1;
    }
    const ok = allLeaves.reduce((acc, val) => {
      return acc + val;
    });
    const please = allPlayersTree.reduce((acc, val) => {
      return acc + val;
    });
    let price = tree.leaves * 10 + ok * sizeSet - please / sizeSet;
    const newLeaves = user.leaves - price;
    if (newLeaves < 0) {
      res
        .status(404)
        .send(
          "You have not enougn money to lock this tree, the price is " + price
        );
      return;
    }
    await user.updateOne({ leaves: newLeaves });
    await tree.updateOne({ lock: true });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

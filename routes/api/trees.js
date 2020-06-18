const express = require("express");
const router = express.Router();

const Tree = require("../../models/Trees");

router.get("/get", (req, res) => {
    Tree.find()
        .then((trees) => {
            let geoloc = [];
            for (let i = 0; i < trees.length; i++) {
                geoloc.push(trees[i].geoloc);
            }
            res.send(geoloc);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;
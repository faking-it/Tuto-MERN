const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const GameLog = require("../../models/Gamelog");

// @route   GET api/side/lead
// @desc    Get leaderboard
// @access  Public

router.get("/lead", function (req, res, next) {
    User.find()
        .sort("-tree")
        .limit(10)
        .exec(function (err, user) {
            if (err) return next(err);
            res.send(user);
        });
});

// router.get('/freetree', function (req, res, next) {
//     Tree
//         .find({
//             'owner': { $eq: "" }
//         })
//         // .where()
//         .limit(10)
//         .exec(function (err, user) {
//             if (err) return next(err);
//             res.send(user);
//         });
// });
// @route   GET api/side/gamelog
// @desc    Get actions from users
// @access  Public

router.get("/gamelog", function (req, res, next) {
    GameLog.find()
        .sort("-date")
        .exec(function (err, gamelog) {
            if (err) return next(err);
            res.send(gamelog);
        });
});

// @route   POST api/side/gamelog
// @desc    Post actions from users
// @access  Private

router.post("/gamelog", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        const newGamelog = new GameLog({
            name: user.name,
            action: req.body.action,
            user: req.user.id
        });

        const gamelog = await newGamelog.save();

        res.json(gamelog);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
});

router.get('/freetree', function (req, res, next) {
    Tree
        .find({
            'owner': { $eq: "" }
        })
        // .where()
        .limit(10)
        .exec(function (err, user) {
            if (err) return next(err);
            res.send(user);
        });
});
router.get('/ownedtree', function (req, res, next) {
    Tree
        .find({
            'owner': { $ne: "" }
        })
        // .where()
        .limit(10)
        .exec(function (err, user) {
            if (err) return next(err);
            res.send(user);
        });
});

module.exports = router;
const express = require("express");
const router = express.Router();
router.get('/lead', function (req, res, next) {
    User
        .find()
        .sort('-leaves')
        .limit(10)
        .exec(function (err, user) {
            if (err) return next(err);
            res.send(user);
        });
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
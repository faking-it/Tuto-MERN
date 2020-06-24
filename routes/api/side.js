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

module.exports = router;
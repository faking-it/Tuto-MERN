const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Tree = require("../../models/Trees");
const Comments = require("../../models/Comments");

// @route   GET api/comments
// @desc    Get all comments
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const comments = await Comments.find().sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/comments
// @desc    Comment on a tree
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.body.userId).select("-password");
      const tree = await Tree.findById(req.body.treeId).select("-password");

      const comment = new Comments({
        text: req.body.text,
        name: user.name,
        tree: tree._id,
        user: user._id
      });

      await comment.save();

      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

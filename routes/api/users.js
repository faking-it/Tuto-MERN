const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Import du modèle User
const User = require("../../models/User");

function cool() {
  return new Promise((resolve) => {
    Tree.find()
      .exec()
      .then((results) => {
        let arraySum = [];
        results.forEach((element) => {
          arraySum.push(element.leaves);
        });
        let please = arraySum.reduce((acc, val) => {
          return acc + val;
        });
        resolve(please);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post(
  "/",
  // C'est ici que les contrôles opèrent, voir la doc:
  // https://express-validator.github.io/docs/
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  // Callback
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, color } = req.body;
    try {
      // Vérifier que l'utilisateur existe
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Obtenir le gravatar de l'utilisateur
      const avatar = gravatar.url(email, {
        s: "200", // default size
        r: "pg", // rating
        d: "mm", // default
      });

      let leaves = await cool();

      user = new User({
        name,
        email,
        avatar,
        password,
        leaves,
        color
      });

      // Crypter le mdp
      const salt = await bcrypt.genSalt(10); // 10 est le nbre conseillé par la doc

      user.password = await bcrypt.hash(password, salt);

      await user.save(); // Car jusqu'à maintenant, l'utilisateur n'était pas enregistré

      // Retourner un jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        // Callback
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   UPDATE api/users/update
// @desc    Update User
// @access  Private
router.post(
  "/update",
  auth,
  async (req, res) => {

    try {
      let user = await User.findById(req.body.id);

      if (user) {
        user = await User.findOneAndUpdate(
          { _id: req.body.id },
          { leaves: req.body.leaves },
          { upsert: true, new: true}
        );
        return res.json(user);
      }
      
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }
)

// @route   UPDATE api/users/updateAll
// @desc    Update All Users
// @access  Private
router.post(
  "/updateAll",
  auth,
  async (req, res) => {

    try {
      let users = await User.find( {} );

      if (users) {
        users = await User.updateMany({},
        {
          leaves: req.body.leaves
        }, {
          upsert: true,
          new: true
        });
        return res.json(users);
      }

    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }
)

module.exports = router;

const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Import du modèle User
const User = require("../../models/User");
const Tree = require("../../models/Trees");

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
function totalPlayers() {
  return new Promise((resolve) => {
    User.find()
      .exec()
      .then((results) => {
        resolve(results.length);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
function totalLeaves() {
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

    const { name, email, password } = req.body;

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
      let totalLeave = await totalLeaves();
      let totalPlayer = await totalPlayers();
      //let leaves = totalLeave / totalPlayer;

      let leaves = await cool();

      user = new User({
        name,
        email,
        avatar,
        password,
        leaves,
      });
      // Crypter le mdp
      const salt = await bcrypt.genSalt(10); // 10 est le nbre conseillé par la doc
      user.password = await bcrypt.hash(password, salt);
      console.log(user.password);

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

module.exports = router;

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Obtenir le token depuis le header
  const token = req.header("x-auth-token");

  // Vérifier s'il n'y a pas de token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Vérifier si le token est valide
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

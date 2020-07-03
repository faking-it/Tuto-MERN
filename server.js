// On doit d'abord importer le module Express
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connexion à la Base de Données
connectDB();

// Initialisation du Middleware
// Cette ligne permet de recevoir le data de la requête req.body
app.use(express.json({ extended: false }));

// La fonction req.send envoie des données au navigateur, ici ("API Running")

// Définition des routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/trees", require("./routes/api/trees"));
app.use("/api/side", require("./routes/api/side"));
app.use("/api/comments", require("./routes/api/comments"));

// Serve static assets in production
if (process.env.NODE_ENV == "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// process.env.PORT est le port qui sera généré une fois le projet hébergé sur Heroku
// Pour l'instant, vu qu'on travaille en local, on définit le port 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

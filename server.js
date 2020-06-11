// On doit d'abord importer le module Express
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connexion à la Base de Données
connectDB();

// La fonction req.send envoie des données au navigateur, ici ("API Running")
app.get("/", (req, res) => res.send("API Running"));

// process.env.PORT est le port qui sera généré une fois le projet hébergé sur Heroku
// Pour l'instant, vu qu'on travaille en local, on définit le port 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

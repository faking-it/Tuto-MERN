// Import des modules mongosse et config
const mongoose = require("mongoose");
const config = require("config");
// On va chercher le lien de connexion à la BD dans le default.json
const db = config.get("mongoURI");

// C'est grâce à cette fonction que server.js va pouvoir se connecter à la BD
// On utilise une asynchrone car plus propre niveau codage
const connectDB = async () => {
  try {
    // Vu que connect() va retourner une promise, on place un await juste avant pour attendre son exécution
    // Le premier paramètre que reçoit connect() est le lien de connexion à la DB
    // Le second paramètre est un array avec toutes les options de connexion
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

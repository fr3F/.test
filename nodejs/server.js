require('dotenv').config();
const cors = require("cors");
const express = require('express');
const app = express();
const db = require('./app/models');

const PORT = process.env.PORT || 8082;

// 1. CORS
var corsOptions = {
    origin: function (origin, callback) {
        // Pour permettre à toutes les origines d'accéder à votre API
        callback(null, true);
    },
};

app.use(cors(corsOptions));
// 2. BODY PARSERS (OBLIGATOIRE AVANT TOUTES LES ROUTES !)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. CHARGEMENT DES ROUTES (maintenant req.body existe !)
require('./app/routes')(app);

// 4. Sync base de données
db.sequelize.sync({ alter: true })
  .then(() => console.log("Base synchronisée"))
  .catch((err) => console.error("Erreur sync :", err));

// 5. Démarrage serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
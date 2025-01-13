// Import des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configuration des variables d'environnement
dotenv.config();

// Initialisation de l'application Express
const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

// Exemple de route par défaut
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de gestion des paiements YWR !');
});

// Définition du port
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

require('dotenv').config(); // Charge les variables d'environnement depuis .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialiser l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;
const cluster = process.env.MONGO_DB_CLUSTER;
const databaseName = process.env.MONGO_DB_DATABASE_NAME;

const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB Atlas'))
  .catch(err => console.error('Erreur de connexion à MongoDB Atlas:', err));

// Importer les routes
const propertyRoutes = require('./routes/properties');
app.use('/api/properties', propertyRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});

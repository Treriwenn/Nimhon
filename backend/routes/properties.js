const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Récupérer tous les biens immobiliers
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Récupérer un bien immobilier par ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property == null) {
      return res.status(404).json({ message: 'Bien immobilier non trouvé' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Créer un nouveau bien immobilier
router.post('/', async (req, res) => {
  try {
    const { name, addresse, price, size, coordinates } = req.body;

    // Validation basique des données
    if (!name || !addresse || !price || !size || !coordinates) {
      return res.status(400).send('Tous les champs sont requis');
    }

    const property = new Property({
      name,
      addresse,
      price,
      size,
      coordinate: coordinates, // Assurez-vous que le champ du schéma est correctement nommé
    });

    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la propriété:', error);
    res.status(500).send('Erreur serveur');
  }
});


// Mettre à jour un bien immobilier par ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProperty == null) {
      return res.status(404).json({ message: 'Bien immobilier non trouvé' });
    }
    res.json(updatedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Supprimer un bien immobilier par ID
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (property == null) {
      return res.status(404).json({ message: 'Bien immobilier non trouvé' });
    }
    await property.remove();
    res.json({ message: 'Bien immobilier supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
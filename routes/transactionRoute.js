// routes/transactionRoute.js
const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

// Ajouter une nouvelle transaction
router.post('/add', transactionController.addTransaction);

// Afficher toutes les transactions
router.get('/all', transactionController.getAllTransactions);

// Afficher le solde actuel
router.get('/balance', transactionController.getBalance);

module.exports = router;

// controllers/transactionController.js
const Transaction = require('../models/transaction');
const GroupAccount = require('../models/groupAccount');

exports.addTransaction = async (req, res) => {
    const { type, amount, description } = req.body;
    
    try {
        // Créer une nouvelle transaction
        const transaction = new Transaction({ type, amount, description });
        await transaction.save();

        // Récupérer le solde actuel du groupe
        const groupAccount = await GroupAccount.findOne();

        // Mettre à jour le solde en fonction du type de transaction
        if (type === 'don' || type === 'offrande') {
            groupAccount.balance += amount;  // Ajouter les dons ou offrandes
        } else if (type === 'depense') {
            groupAccount.balance -= amount;  // Soustraire les dépenses
        }

        await groupAccount.save();  // Sauvegarder le solde mis à jour

        res.status(200).json({ message: 'Transaction enregistrée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement de la transaction', error });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.render('transactions', { transactions });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des transactions', error });
    }
};

exports.getBalance = async (req, res) => {
    try {
        const groupAccount = await GroupAccount.findOne();
        res.status(200).json({ balance: groupAccount.balance });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du solde', error });
    }
};

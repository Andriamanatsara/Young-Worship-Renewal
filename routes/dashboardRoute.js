const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Member = require('../models/memberEntity');
const memberController = require('../controllers/memberController');
const accountController= require('../controllers/accountController');
const Account = require('../models/accountEntity');
const AccountGroup = require('../models/accountGroup');

router.get('/tableau-de-bord',userController.userConected, async (req, res) => {
    try {
        res.render('admin/dashboard', {title : 'Tableau de bord YWR', page : 'dashboard'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur de serveur');
    }
});

router.get('/liste-membre', userController.userConected, async (req, res) => {
    try{
        const members = await Member.find({status : 'accepted'});
        res.render('admin/member-dashboard', { members, title : 'Liste des membres', page : 'liste-membre'});
    }catch (err) {
        console.error(err);
        res.status(500).send('Erreur de serveur');
    } 
});

router.get('/edit/:id', userController.userConected, async (req, res) => {
  try{
    const member = await Member.findById(req.params.id);
    res.render('admin/edit-member', { member, page : "", title : "Modifier un membre"});
  }catch (err){
    console.error(err);
      res.status(500).send('Erreur de serveur');
  }
});

router.post('/edit/:id', memberController.edit);


router.get('/requests', userController.userConected, async (req, res) => {
    try {
        const pendingMembers = await Member.find({status : 'pending'});
        res.render('admin/member-request', {members : pendingMembers, page : "member-request", title : "Gestion des requêtes"});
    } catch (error) {
        console.log(error);
        res.send('Erreur lors du chargement des requêtes.');
    }
});

router.post('/approve/:id', async(req, res) => {
    try {
        await Member.findByIdAndUpdate(req.params.id,{status  : 'accepted'});
        req.session.message = {
            type : 'success',
            message : 'Membre accepté.'
        };
        res.redirect('/admin/requests');
    } catch (err) {
        console.log(err);
        res.send('Erreur de requêtes.');
    }
});

router.post('/reject/:id', async (req, res) => {
    try {
        await Member.findByIdAndUpdate(req.params.id, {status : 'rejected'});
        req.session.message = {
            type : 'danger',
            message : 'Demande rejetée.',
        }
        res.redirect('/admin/requests');
    } catch (err) {
        console.log(err);
        res.send('Erreur de requêtes.');
    }
});

router.get('/comptabilite', userController.userConected, async (req, res) => {
    try {
        const transactions = await Account.find().sort({ date: -1 });
        const soldeActuel = await AccountGroup.findOne();
        
        let solde = soldeActuel ? soldeActuel.solde : 0; 
        res.render('admin/account', { transactions, solde, title: "Compte du groupe", page: "account" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des transactions', error });
    }
});


router.post('/comptabilite', accountController.addTransaction);

module.exports = router;
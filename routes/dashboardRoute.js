const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/tableau_de_bord',userController.userConected, async (req, res) => {
    try {
        res.render('admin/dashboard', {title : 'Tablea de board YWR', page : 'dashboard'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur de serveur');
    }
});

router.get('/liste-membre', userController.userConected, async (req, res) => {
    try{
        res.render('admin/member-dashboard', {title : 'Liste des membres', page : 'liste-membre'});
    }catch (err) {
        console.error(err);
        res.status(500).send('Erreur de serveur');
    } 
});

module.exports = router;
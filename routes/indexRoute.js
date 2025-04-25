const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const Member = require('../models/memberEntity');



router.get('/', async (req, res) => {
    try {
      res.render('index',{title : 'Young-Worship-Renewal'});
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur de serveur');
    }
  });

  router.get('/rejoindre', async (req, res) => {
    try {
        res.render('rejoign', { 
            title: "Rejoindre YWR", 
            formData: {},
            errors: {}
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur de serveur.');
    }
});

router.post('/rejoindre', memberController.rejoign);

  router.get('/membres', async (req, res) => {
    try{
      const members = await Member.find({status : 'accepted'});
      res.render('Member', {members, title : "Gallerie des membres YWR"});
    }catch (err) {
      console.error(err);
      res.status(500).send('Erreur de serveur');
    }
  });




module.exports = router;
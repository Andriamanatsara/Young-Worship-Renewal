const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')



router.get('/', async (req, res) => {
    try {
      res.render('index',{title : 'Young-Worship-Renewal'});
      // console.log(req.session);
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur de serveur');
    }
  });

  router.get('/rejoindre', async (req, res) => {
    try{
      res.render('rejoign', {title : "Rejoindre YWR"});
    }catch(err){
      console.error(err);
      res.status(500).send('Erreur de serveur');
    }
  });


module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', (req, res) => {
    
    res.render('auth/register');
});
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/register', userController.register);



router.post('/login', userController.login);

router.get('/logout', userController.logout);

module.exports = router;

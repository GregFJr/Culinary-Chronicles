const router = require('express').Router();
const passport = require('../config/passport');
const { User } = require('../models');

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/login', async (req, res) => {
    try {
    res.render('login');
    } catch (err) {
    res.status(500).json(err);
    }
    });
    
router.get('/logout', async (req, res) => {
    req.logout();
    res.redirect('/');
});


// below is for testing purposes. Check insomnia to see if it works
router.get('/users', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: ['username', 'password'],
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;

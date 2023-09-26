const router = require('express').Router();
const passport = require('../config/passport');
const { User } = require('../models');

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/login', (req, res) => {
    res.render('login');

router.get('/logout', async (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;

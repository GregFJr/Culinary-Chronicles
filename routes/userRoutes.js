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
});


module.exports = router;

const router = require('express').Router();
const passport = require('../config/passport');
const { User } = require('../models');

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;

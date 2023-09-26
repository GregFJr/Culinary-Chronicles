const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.use(new LocalStrategy(
    {
        usernameField: 'username'
    },
    async (username, password, done) => {
        try {
            const userData = await User.findOne({ where: { username: username } });
            
            if (!userData) {
                return done(null, false, { message: 'Incorrect username!' });
            }
            
            const validPassword = userData.checkPassword(password);
            
            if (!validPassword) {
                return done(null, false, { message: 'Incorrect password!' });
            }
            
            return done(null, userData);
        } catch (err) {
            done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const userData = await User.findByPk(id);
        done(null, userData);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcrypt');


passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const userData = await User.findOne({ where: { username: username } });
            
            if (!userData) {
                return done(null, false, { message: 'Incorrect username or password!' });
            }
            
            const isValidPassword = await bcrypt.compare(password, userData.password);


            
            if (!isValidPassword) {
                return done(null, false, { message: 'Incorrect username or password!' });
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

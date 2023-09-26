const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const exphbs = require('express-handlebars');
const routes = require('./routes')
const path = require('path');
const helpers = require('./utils/helpers');
const fs = require('fs');
const handlebars = require('handlebars');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const navbarTemplate = fs.readFileSync('./views/partials/navbar.handlebars', 'utf8');

handlebars.registerPartial('navbar', navbarTemplate); 

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({ helpers });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session({ secret: 'superSecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  

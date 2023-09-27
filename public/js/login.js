// code to handle login form submission here
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const user =[];

app.get('/login', (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});
app.post('/login', (req, res) => {
    const { firstName, lastName, email, password, newsLetter } = req.body;
    const userExists = users.some(user => user.email === email);
        userExists = users.some(user => user.password == password);
        

    if (userExists) {
        return res.status(400).send('User already exists');
    }
    const newUser = {
        firstName,
        lastName,
        email,
        password,
        newsLetter: !!newsLetter,
    };

    users.push(newUser);

    res.redirect('/');

});

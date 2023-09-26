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


// non working code below



// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const User = require('./models/User'); // Replace with the path to your existing User model

// // Login route
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/login',
// }));



// // the signup form is on the login page
// // Signup route
// router.post('/login', async (req, res) => {
//   const { username, password, firstname, lastname, email, newsletter } = req.body;
  
//   try {
//     const hashedPassword = await User.hashPassword(password); // Assuming you have a method in your User model to hash passwords
//     const user = new User({
//       username,
//       password: hashedPassword,
//       firstname,
//       lastname,
//       email,
//       newsletter: !!newsletter, // Convert the checkbox value to boolean
//     });

//     await user.save();
//     res.redirect('/login'); // Redirect to the login page after successful signup
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error'); // Handle any error that occurs during signup
//   }
// });

// module.exports = router;

  
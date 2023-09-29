const router = require("express").Router();
const passport = require("../config/passport");
const { User, Rating } = require("../models");


router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
  

router.get("/login", async (req, res) => {
  try {
    res.render("login", {
        errorMessage: req.flash("error"),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  req.logout();
  res.redirect("/");
});


router.get('/users', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: ['id','username', 'password', 'firstname', 'lastname', 'email'], 
            include: [
                {
                    model: Rating,
                    attributes: ['value', 'comment', 'recipe_id']
                }
            ]
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});


//handles the signup route
router.post('/signup', async (req, res) => {
    const { firstname, lastname, username, password } = req.body;
    try {
      const user = await User.create({
        username,
        password,
        firstname,
        lastname,
        email: username
      });
      await user.save();
  
      req.login(user, function(err) {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error during authentication');
        }
        return res.redirect('/');
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

module.exports = router;

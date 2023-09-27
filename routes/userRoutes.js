const router = require("express").Router();
const passport = require("../config/passport");
const { User } = require("../models");
const fs = require("fs");
const path = require("path");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  req.logout();
  res.redirect("/");
});

// below is for testing purposes. Check insomnia to see if it works
router.get("/users", async (req, res) => {
  try {
    const userData = await User.findAll({
      // attributes: ['username', 'password'],
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
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


//handles the login route

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
}); // this checks the db for the email and password. if they match, it logs them in. if not, it sends an error message

module.exports = router;

const router = require('express').Router();
const { Recipe } = require('../models');
const userRoutes = require('./userRoutes');
const { Drinks } = require('../models');

router.get('/', async (req, res) => {
    console.log("Is user authenticated:", req.isAuthenticated());
    console.log("User data:", req.user);
    try {
        const recipeData = await Recipe.findAll({
            limit: 12
        });
        const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
        const user = req.user ? req.user.get({ plain: true }) : null;

        const messages = {
            success: req.flash('success'),
            error: req.flash('error')
        }

        res.render('homepage', { 
            recipes,
            user: user,
            messages,
         });
    } catch (err) {
        console.error("Database error:", error);
        res.status(500).json(err);
    }
});

router.get('/recipe/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id);
        if (!recipeData) {
            res.status(404).json({ message: 'No recipe found with this id!' });
            return;
        }
        const recipe = recipeData.get({ plain: true });
        res.render('recipe', { recipe });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/drinks', async (req, res) => {
    try {
        const drinkData = await Drinks.findAll({
            limit: 12
        });
        const drinks = drinkData.map((drink) => drink.get({ plain: true }));
        res.render('drinks', { drinks });
    } catch (err) {
        console.error("Database error:", error);
        res.status(500).json(err);
    }
});

router.use(userRoutes);
module.exports = router;

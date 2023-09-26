const router = require('express').Router();
const { Recipe } = require('../models');
const userRoutes = require('./userRoutes');

router.get('/', async (req, res) => {
    try {
        const recipeData = await Recipe.findAll({
            limit: 8
        });
        const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
        console.log(recipes);
        res.render('homepage', { recipes });
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

router.use(userRoutes);
module.exports = router;

const router = require('express').Router();
const { Recipe, Rating, User } = require('../models');

router.get("/", async (req, res) => {
    try {
        const ratedRecipesData = await Recipe.findAll({
            include: [{
                model: Rating,
                required: true 
            }],
            distinct: true
        });

        const ratedRecipes = ratedRecipesData.map(recipe => recipe.get({ plain: true }));

        res.render("social", { ratedRecipes });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.get("/recipe/:id", async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipeData = await Recipe.findByPk(recipeId, {
            include: [
                {
                    model: Rating,
                    include: [User] 
                }
            ]
        });

        if (!recipeData) {
            return res.status(404).send("Recipe not found");
        }

        const recipeDetail = recipeData.get({ plain: true });
        const user = req.user ? req.user.get({ plain: true }) : null;

        res.render("socialRating", { 
            recipe: recipeDetail,
            user: user
         });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});



module.exports = router;
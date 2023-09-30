const router = require("express").Router();
const { User, Recipe, SavedRecipes, Rating } = require("../models");

router.post("/saved-recipe", async (req, res) => {
  try {
    await SavedRecipes.create({
      user_id: req.session.user_id,
      recipe_id: req.body.recipe_id,
    });
    res.status(200).json({ message: "Recipe saved successfully!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:recipeId", async (req, res) => {
  try {
    await SavedRecipes.destroy({
      where: {
        user_id: req.session.user_id,
        recipe_id: req.params.recipeId,
      },
    });
    res.status(200).json({ message: "Recipe removed from saved list!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/saved-recipes", async (req, res) => {
  // const userId = req.session.user_id;

  try {
    // const savedData = await SavedRecipes.findAll({
    //   where: {
    //     user_id: userId,
    //   },
    //   include: [Recipe],
    // });

    // const savedRecipes = savedData.map((data) => data.get({ plain: true }));
    const user = req.user ? req.user.get({ plain: true }) : null;

    res.render("savedRecipes", { user:user});
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

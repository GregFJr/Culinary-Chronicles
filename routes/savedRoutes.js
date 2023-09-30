const router = require("express").Router();
const { User, Recipe, SavedRecipes, Rating } = require("../models");

router.post("/saved-recipe", async (req, res) => {
  try {
    await SavedRecipes.create({
      user_id: req.user.id,
      recipe_id: req.body.recipe_id,
    });
    // I'm Updating the session with the latest saved recipe ID to mark it as modified, allowing 'resave' to remain 'false'.
    req.session.lastSavedRecipeId = req.body.recipe_id;

    res.status(200).json({ message: "Recipe saved successfully!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/saved-recipe/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    await SavedRecipes.destroy({
      where: {
        id: req.params.id,
        user_id: req.user.id,
      },
    });

        
    if (result) {
        res.status(200).json({ message: "Recipe deleted successfully!" });
    } else {
        res.status(400).json({ message: "No recipe found with this ID for the current user." });
    }
} catch (err) {
    res.status(500).json({ message: "Internal server error.", error: err.message });
}
});

//This route is for the user to view their saved recipes. work in progress.
router.get("/saved-recipes", async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect("/login");
    }

    const savedData = await SavedRecipes.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [Recipe, Rating],
    });

    const savedRecipes = savedData.map((data) => data.get({ plain: true }));

    const user = req.user.get({ plain: true });

    console.log(JSON.stringify(savedRecipes, null, 2));


    res.render("savedRecipes", {
      savedRecipes: savedRecipes,
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;

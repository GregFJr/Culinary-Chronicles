const Recipe = require('./Recipe');
const User = require('./User');
const Rating = require('./Rating');
const Drinks = require('./Drinks');
const SavedRecipes = require('./Saved');


Recipe.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Recipe, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Recipe.hasMany(Rating, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});
Rating.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});

User.hasMany(Rating, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Rating.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(SavedRecipes, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',  
  });
SavedRecipes.belongsTo(Recipe, {
    foreignKey:'recipe_id',
  });

Recipe.hasMany(SavedRecipes, {  
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE',
  });
SavedRecipes.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
  

module.exports = { Recipe, User, Rating, Drinks, SavedRecipes };
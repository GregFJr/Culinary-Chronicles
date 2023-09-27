const Recipe = require('./Recipe');
const User = require('./User');
const Rating = require('./rating');


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

module.exports = { Recipe, User, Rating };
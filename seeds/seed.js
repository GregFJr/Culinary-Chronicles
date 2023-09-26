const sequelize = require('../config/connection');
const { Recipe, User } = require('../models');
const recipeData = require('./recipeData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        await Recipe.bulkCreate(recipeData);
        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding the database:', err);
        process.exit(1);
    }
};

seedDatabase();


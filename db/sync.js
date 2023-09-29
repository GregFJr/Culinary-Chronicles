const sequelize = require('../config/connection');
const { Recipe } = require('../models');
const recipeData = require('./recipeData.json');  // Import the JSON data
const { Drinks } = require('../models');
const drinksData = require('./drinksData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        await Recipe.bulkCreate(recipeData);
        await Drinks.bulkCreate(drinksData);
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding the database:', err);
        process.exit(1);
    }
};

seedDatabase();

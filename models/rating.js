const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {}

Rating.init(
    {
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        comment: {
            type: DataTypes.TEXT
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model:'recipe',
                key: 'id'
            }

        },
    },
    {
        sequelize,
        modelName: 'rating'
    }
);

module.exports = Rating;

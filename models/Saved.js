// models/savedRecipe.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SavedRecipe extends Model {}

SavedRecipe.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipe',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'savedRecipe'
  }
);

module.exports = SavedRecipe;

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, {foreignKey: 'gameId'});
    }
  }
  Tile.init({
    gameId: DataTypes.INTEGER,
    hasTrap: DataTypes.BOOLEAN,
    foodType: DataTypes.STRING,
    movementType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tile',
  });
  return Tile;
};
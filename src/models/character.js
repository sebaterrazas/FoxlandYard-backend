'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, {foreignKey: 'gameId'});
      this.belongsTo(models.Player, {foreignKey: 'playerId'});
      this.belongsTo(models.Tile, {foreignKey: 'tileId'});
    }
  }
  Character.init({
    gameId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER,
    tileId: DataTypes.INTEGER,
    traps: DataTypes.INTEGER,
    food: DataTypes.INTEGER,
    walkCards: DataTypes.INTEGER,
    bikeCards: DataTypes.INTEGER,
    carCards: DataTypes.INTEGER,
    tunnelCard: DataTypes.BOOLEAN,
    isAsh: DataTypes.BOOLEAN,
    isKris: DataTypes.BOOLEAN,
    isKyle: DataTypes.BOOLEAN,
    isRat: DataTypes.BOOLEAN,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};
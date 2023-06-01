'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, {foreignKey: 'gameId'});
      this.belongsTo(models.User, {foreignKey: 'userId'});
      this.hasOne(models.Character, {foreignKey: 'id'});
    }
  }
  Player.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
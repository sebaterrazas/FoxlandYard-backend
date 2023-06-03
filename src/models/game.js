const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Character, { foreignKey: 'gameId' });
      this.hasMany(models.Node, { foreignKey: 'gameId' });
    }
  }
  Game.init({
    turn: DataTypes.INTEGER,
    winner: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Game, { foreignKey: 'gameId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Node, { foreignKey: 'nodeId' });
    }
  }
  Character.init({
    gameId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    nodeId: DataTypes.INTEGER,
    food: DataTypes.INTEGER,
    walkCards: DataTypes.INTEGER,
    bikeCards: DataTypes.INTEGER,
    carCards: DataTypes.INTEGER,
    burrowCards: DataTypes.INTEGER,
    isAsh: DataTypes.BOOLEAN,
    isKris: DataTypes.BOOLEAN,
    isKyle: DataTypes.BOOLEAN,
    isRat: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};

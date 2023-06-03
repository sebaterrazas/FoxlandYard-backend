const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Character, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: 'Username must be alphanumeric',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isValidPassword(value) {
          if (!value.match(/[a-z]/) || !value.match(/[0-9]/) || !value.match(/[@$!%*?&]/)) {
            throw new Error('Password must contain at least a letter, one number and one special character');
          }
        },
      },
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email must be have a valid format',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

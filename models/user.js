'use strict';
const {Model, INTEGER} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasMany(models.Message, {as: 'UserId', foreignKey: 'author_id', onDelete: 'cascade'});
        }
    }

    User.init({
        nickname: DataTypes.STRING,
        avatar: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};
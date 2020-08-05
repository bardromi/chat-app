'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasMany(models.Message, {as: 'UserId', foreignKey: 'author_id'});
        }
    }

    User.init({
        nickname: {
            unique: true,
            type: DataTypes.STRING
        },
        avatar: DataTypes.STRING,
        color: DataTypes.STRING,
        socket_id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};
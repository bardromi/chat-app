const User = require('../models').User;

async function getUsers() {
    return await User.findAll();
}

async function getUserByNickName(userNickName) {
    return await User.findOne({
        where: {nickName: userNickName},
    });
}

async function createUser(userNickName) {
    return await User.create({nickname: userNickName});
}

async function deleteUser(id) {
    return await User.destroy({
        where: {id}
    });
}

module.exports = {
    getUsers,
    getUserByNickName,
    createUser,
    deleteUser
}

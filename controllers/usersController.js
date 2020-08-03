const User = require('../models').User;

async function getUsers() {
    return await User.findAll();
}

async function getUserByNickName(nickName) {
    return await User.findOne({
        where: {nickName: nickName},
    });
}

async function createUser(nickName) {
    return await User.create({nickName: nickName});
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

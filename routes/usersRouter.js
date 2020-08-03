const express = require('express');
const router = express.Router();
const User = require('../models').User;
const {getUsers, getUserByNickName, createUser, deleteUser} = require('../controllers/usersController')


/* GET users listing. */
router.get('/', async (req, res) => {
    const users = await getUsers();

    res.send(users);
});

router.post('/', async (req, res) => {
    const userNickName = req.body.nickname;

    let user = await getUserByNickName(userNickName);

    if (!user) {
        user = await createUser(userNickName);
    } else {
        res.send({
            data: "",
            success: false,
            message: "user already exist"
        })
        return;
    }

    res.send({
        data: user,
        success: true,
        message: ""
    });
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await deleteUser(id);

    if (!user) {
        res.send({
            success: false,
            message: "could not delete the user"
        });
        return;
    }

    res.send({
        success: true,
        message: "user deleted"
    });
})

module.exports = router;

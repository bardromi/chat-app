const express = require('express');
const router = express.Router();
const User = require("../models").User

/* GET users listing. */
router.get('/', async (req, res) => {
    const users = await User.findAll();

    res.send(users);
});

router.post('/', async (req, res) => {
    const userNickName = req.body.nickname;
    console.log(req.body.nickname);
    const users = await User.findAll({
        where: {nickname: userNickName},
    });

    const user = users[0];
    if (!user) {
        await User.create({nickname: userNickName});
    }
    res.send(users);
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const user = await User.destroy({
        where: {id: Number(id)}
    });

    if (!user) {
        res.send("could not delete the user");
        return;
    }

    res.send("user deleted");
})

module.exports = router;

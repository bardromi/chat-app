const express = require('express');
const {Sequelize} = require('sequelize');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index', {title: 'Express'});
});

router.get('/drop', async (req, res) => {
    await Sequelize.drop();
    console.log("All tables dropped!");
    res.send("dropped all tables");
});

router.use('/users', require('./usersRouter.js'));
router.use('/messages', require('./messagesRouter.js'));

module.exports = router;

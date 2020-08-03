const express = require('express');
const router = express.Router();
const {getMessages} = require('../controllers/messagesController');

/* GET messages */
router.get('/', async (req, res) => {
    const messages = getMessages();

    res.send(messages);
});

module.exports = router;

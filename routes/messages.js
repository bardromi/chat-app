const express = require('express');
const router = express.Router();
const Message = require("../models").Message

/* GET messages */
router.get('/', async (req, res) => {
    const messages = await Message.findAll();

    res.send(messages);
});

module.exports = router;

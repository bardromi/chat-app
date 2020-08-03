const Message = require("../models").Message;

async function getMessages() {
    return await Message.findAll();
}

module.exports = {
    getMessages
}
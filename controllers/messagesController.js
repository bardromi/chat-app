const Message = require("../models").Message;
const User = require("../models").User;

async function getMessages() {
    return await Message.findAll();
}

async function createMessage(messageData) {
    await Message.create({
        author_id: messageData.author_id,
        message: messageData.message,
    });
}

async function getLatestMessagesUserIncluded(limit) {
    return await Message.findAll({
        include: [
            {model: User}
        ],
        order: [
            ['createdAt', 'DESC'],
        ],
        limit: limit,
    });
}

module.exports = {
    getMessages,
    createMessage,
    getLatestMessagesUserIncluded
}
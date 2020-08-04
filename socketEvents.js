const models = require("./models");
const {createMessage} = require("./controllers/messagesController");
const {getLatestMessagesUserIncluded} = require("./controllers/messagesController");

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log(`New socket connection: SocketId: ${socket.id}`)

        socket.on('disconnect', () => {
            console.log(`SocketId: ${socket.id} disconnected`)
        })

        socket.on("join", async (user) => {
            const latestMessages = await getLatestMessagesUserIncluded(10);

            latestMessages.reverse();

            io.emit("chatJoin", latestMessages);
        });

        socket.on("message", async messageData => {
            await createMessage(messageData);

            const latestMessages = await getLatestMessagesUserIncluded();

            latestMessages.reverse();

            io.emit("latestMessages", latestMessages);
        });

        socket.on("test", async data => {
            console.log(data);

            io.emit("latestMessages", "stam");
        });
    });


}

module.exports = socketEvents
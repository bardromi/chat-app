const {getUsers} = require("./controllers/usersController");
const {deleteUserBySocketID} = require("./controllers/usersController");
const {addSocketId} = require("./controllers/usersController");
const {createMessage} = require("./controllers/messagesController");
const {getLatestMessagesUserIncluded} = require("./controllers/messagesController");

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log(`New socket connection: SocketId: ${socket.id}`)

        socket.on('disconnect', async () => {
            console.log(`SocketId: ${socket.id} disconnected`);
            await deleteUserBySocketID(socket.id);

            const users = await getUsers();

            io.emit("leftChat", users);
        });

        socket.on("join", async (user) => {
            await addSocketId(user.id, socket.id);
            const latestMessages = await getLatestMessagesUserIncluded(10);

            latestMessages.reverse();

            const users = await getUsers();

            io.emit("chatJoin", {messages: latestMessages, users: users});
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
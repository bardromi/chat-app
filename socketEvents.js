const models = require("./models");

const socketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log(`New socket connection: SocketId: ${socket.id}`)

        socket.on('disconnect', () => {
            console.log(`SocketId: ${socket.id} disconnected`)
        })

        socket.on("join", async (user) => {
            console.log("user", user);
            const date = new Date();
            const latestMessages = await models.Message.findAll({
                include: [
                    {model: models.User}
                ],
                limit: 10,
            });
            io.emit("chatJoin", {
                user_id: user.id,
                date,
                messages: latestMessages
            });
        });

        socket.on("message", async data => {
            const {author_id, message} = data;
            console.log(data);
            await models.Message.create({
                author_id: author_id,
                message: message,
            });

            const latestMessages = await models.Message.findAll({
                limit: 10,
            });
            io.emit("latestMessages", latestMessages);
        });

        socket.on("test", async data => {
            console.log(data);

            io.emit("latestMessages", "stam");
        });

        //broadcast new message to all sockets
        // socket.on('newMessage', (newMessage) => {
        //     socket.broadcast.emit('addMessage', newMessage)
        // })
    });


}

module.exports = socketEvents
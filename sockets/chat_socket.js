module.exports.connection = (io) => {
    io.on("connection", (socket) => {
        eventConnection(socket)
    })
}

const eventConnection = (socket) => {
    console.log(socket.id)
    socket.handshake.query
}

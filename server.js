const http = require('http');
const express = require('express');
const socketIO = require("socket.io");

const PORT = process.env.PORT || 3000
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log(socket.id)
})

server.listen(PORT, () => {
    console.log(`Server Listening from ${PORT}`);
});

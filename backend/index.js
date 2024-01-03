const express = require('express');
const app = express()
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const connection = require('./config/db');
const { userRoute } = require('./routes/user.routes');
require('dotenv').config()
const onlineUsers = {};

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on('userConnected', (userDetails) => {
        onlineUsers[socket.id] = userDetails;
        io.emit('updateOnlineUsers', Object.values(onlineUsers));
    });


    socket.on('disconnect', () => {
        delete onlineUsers[socket.id];
        io.emit('updateOnlineUsers', Object.values(onlineUsers));
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
    });

    socket.on("join_room", (data) => {
        socket.join(data);
    })

})

app.use("/users",userRoute)

server.listen(4500, async () => {
    try {
        await connection
        console.log('Connected to db')
    } catch {
        console.log('Not connected to db')
    }
    console.log('app running at port 4500')
})
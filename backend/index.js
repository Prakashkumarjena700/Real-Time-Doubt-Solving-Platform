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
        origin: 'http://localhost:3000/dashboard',
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.on('userConnected', (userDetails) => {
        console.log(socket.id);

        onlineUsers[socket.id] = userDetails;
        io.emit('updateOnlineUsers', Object.values(onlineUsers));
    });


    socket.on('disconnect', () => {
        delete onlineUsers[socket.id];
        io.emit('updateOnlineUsers', Object.values(onlineUsers));
    });

    socket.on("join_room", (data) => {
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        console.log('Received message:', data);
        io.emit("receive_alert", data);
    });

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
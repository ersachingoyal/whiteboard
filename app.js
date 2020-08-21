// npm  init -y
//npm install express
//npm install socket.io
const express = require('express');
const app = express();
//  nodejs module
const httpServer = require('http').createServer(app);
//  socket enbaled server
const io = require('socket.io')(httpServer);
io.on("connection", function (socket) { //establish the web socket connection 
    console.log("New client connected");
    console.log(socket.id);
    socket.on("color", function (color) {  //recvieves the event from the client
        // console.log(data);
        socket.broadcast.emit('colorchange', color); //broadcast the event to other clients
    })
    socket.on("md", function (point) {
        socket.broadcast.emit("onmd", point);
    })
    socket.on("mm", function (point) {
        socket.broadcast.emit("onmm", point);
    })
})

//  connection
let port = process.env.PORT || 3000;  //will take port if found from server otherwise take 3000 as default port
httpServer.listen(port, function () {
    console.log("Server started at port 3000");
})

const express = require("express");
const app = express();
const http = require("http");  //these four codes are for running the server
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors()); // this solves cors problems


const server = http.createServer(app);


const NODE_PORT = process.env.PORT || 3001
const io = new Server(server, {
    cors: { // with this we can solve cors issues. // primeiro argumento era "http://localhost:3000" e segundo, "http://192.168.100.130:3000"
        origin: "*",
        // quando eu coloquei "*", funcionou!!!
        methods: ["GET", "POST"], //
    },
});




io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

 socket.on("join_room", (data) => {
        socket.join(data); // throug the "data" parameter, we are passing this data from the front end to here!
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });
      socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data); // the socket.to, is specifying the id of the room, so that the message wont display to everyone in all rooms
        console.log(data) 
      });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id); // this event listens when the user connects or disconnects
    });
   // this means server will listen pro process.env.your_Port OR 80
})


// aqui antes era 3001
server.listen(NODE_PORT, () => {
    console.log("SERVER RUNNING") 
})

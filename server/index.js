const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = createServer(app);
let acceptCall = "";

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("join", (data) => {
    socket.join(data);
    console.log(`Join req from ${socket.id} to ${data}`);
    socket.broadcast.to(data).emit("user-join", socket.id);
  });

  socket.on("call-user", (data) => {
    const { id, offer } = data;
    acceptCall = socket.id;
    socket.to(id).emit("incoming-call", { from: id, offer });
  });

  socket.on("call-accepted", (data) => {
    const { id, ans } = data;
    socket.to(acceptCall).emit("call-accepted", { ans });
  });

  socket.on("message", (data) => {
    // console.log(data);
    socket.to(data.roomId).emit("receive", data);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log(socket);
});

httpServer.listen(3000, () => {
  console.log("Server started on port 3000");
});

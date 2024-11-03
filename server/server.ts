import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as path from "path";

const app = express();
const dirPath = path.join(__dirname, "./public");

app.use(express.static(dirPath));

app.listen(3000, () => {
  console.log("check port 3000");
});

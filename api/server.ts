import dotenv from "dotenv";
import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = createServer(app);
app.use(json());

server.listen(process.env.PORT || 5000, () => {
  console.log("Listening at 5000");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("userConnectionDetails", {
      signal: data.signal,
      from: data.from,
      name: data.name,
      isReceivingCall: true,
    });
  });
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("userConnectionDetails", {
      signal: data.signal,
      from: data.from,
      name: "",
      isReceivingCall: false,
    });
  });
  socket.on("sendMsg", (data) => {
    io.to(data.to).emit("receiveMsg", data.msg);
  });
  socket.on("close", (data) => {
    io.to(data.to).emit("close");
  });
});

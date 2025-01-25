const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const cors = require("cors");

app.use(cors());

let waitingUser = null;

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // Handle when a user joins the queue
  socket.on("joinQueue", () => {
    console.log(`User ${socket.id} joined the queue`);

    if (waitingUser) {
      // If there's another user waiting, connect them
      console.log(`Matching ${socket.id} with ${waitingUser.id}`);
      socket.emit("startCall", { from: waitingUser.id });
      waitingUser.emit("startCall", { from: socket.id });
      waitingUser = null;  // Reset the waiting user after match
    } else {
      // If no one is waiting, add this user to the queue
      console.log(`User ${socket.id} is waiting for a match`);
      waitingUser = socket;
    }
  });

  // When a user disconnects, reset waitingUser if necessary
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (waitingUser === socket) {
      waitingUser = null;
    }
  });

  // Handle offer, answer, and ICE candidates
  socket.on("offer", (data) => {
    console.log("Sending offer to:", data.to);
    io.to(data.to).emit("offer", { offer: data.offer, from: socket.id });
  });

  socket.on("answer", (data) => {
    console.log("Sending answer to:", data.to);
    io.to(data.to).emit("answer", { answer: data.answer });
  });

  socket.on("candidate", (data) => {
    io.to(data.to).emit("candidate", data.candidate);
  });
});

server.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

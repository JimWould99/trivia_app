const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
require("dotenv").config();

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "*" },
});

app.use(cors());

const roomIds = {};

io.on("connect", (socket) => {
  console.log("socket id:", socket.id);

  socket.on("create-room", (room) => {
    if (roomIds[room]) {
      return;
    }
    socket.join(room);
    console.log(`room created ${room}`);
    // console.log(`${socket.id} created ${room}`);
    roomIds[room] = [socket.id];
    console.log(`add room ${JSON.stringify(roomIds)}`);
    socket.emit("confirm-create-room", room);
  });

  socket.on("join-room", (room) => {
    if (!roomIds[room]) {
      return;
    }
    socket.join(room);
    console.log(`room joined ${room}`);
    roomIds[room].push(socket.id);
    console.log(`join room ${JSON.stringify(roomIds)}`);
    socket.emit("join-confirmation-joiner", room);
    io.in(room).emit("join-confirmation", roomIds[room]);
    io.to(roomIds[room][0]).emit("join-confirmation", roomIds[room]);
    // socket.to(room).emit("join-confirmation", roomIds[room]);
  });
  // receive message of 'test event' from client
  socket.on("test-event", (message, room) => {
    if (room === "") {
      //send message back to client- 'io.emit'= send to all clients
      // socket.broadcast.emit= send to all aside from sender
      socket.broadcast.emit("received-message", message);
    } else {
      // to includes broadcast
      socket.to(room).emit("received-message", message);
    }
  });

  socket.on("disconnect", () => {
    io.emit(`${socket.id} has left the chat`);
    for (room in roomIds) {
      if (roomIds[room].includes(socket.id)) {
        const newRoom = roomIds[room].filter((value) => {
          return value !== socket.id;
        });
        roomIds[room] = newRoom;
        if (roomIds[room].length === 0) {
          delete roomIds[room];
        }
      }
    }
    // console.log(`rooms after disconnect ${JSON.stringify(roomIds)}`);
  });
});

const triviaRouter = require("./routes/trivia");
const triviaUserRouter = require("./routes/trivia_user");
const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.use("/", triviaRouter);

app.use("/trivia_user", triviaUserRouter);

server.listen(3006, () => {
  console.log("listing on port 3006");
});

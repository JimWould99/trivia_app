const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
require("dotenv").config();
const { instrument } = require("@socket.io/admin-ui");

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "*" },
});

app.use(cors());

const gameRooms = require("./gameRooms");

io.on("connect", (socket) => {
  gameRooms(io, socket);
});

instrument(io, { auth: false });

const triviaRouter = require("./routes/trivia");
const triviaUserRouter = require("./routes/trivia_user");
const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.use("/", triviaRouter);

app.use("/trivia_user", triviaUserRouter);

server.listen(3007, () => {
  console.log("listing on port 3007");
});

const roomIds = {};

//let quizQuestions = {};
let answers = {};
//let questionIndex = {};

const ranking = {};
/*
store-
const = [question 1: [{user: playerOne, time: 20sec, correct: false}], question 2: [{user: playerOne, time: 20sec, correct: false}] ] 
const answers= {room1: {question 1: [{user: playerOne, time: 20sec, correct: false}], question 2: [{user: playerOne, time: 20sec, correct: false}] }}
questions= [{},{}]

const quizQuestions = {room: questions, room: questions}
const questionIndex: {room: index, room: index}
const timer = {room: timer}
*/

/*
draft two
const answers= {room1: {question 1: [{user: playerOne, time: 20sec, correct: false}], question 2: [{user: playerOne, time: 20sec, correct: false}] }}

const answers = {room: [{user: playerOne, time: 20sec, correct: false}]}
then reset for each question
dont store anything yet

const ranking
*/

module.exports = (io, socket) => {
  console.log("socket id:", socket.id);

  socket.on("game_connection", (questions, room) => {
    /*quizQuestions[room] = questions;
    questionIndex[room] = 0;
    let roomValues = {};
    for (let i = 0; i <= questions.length - 1; i++) {
      roomValues[Number(i)] = [];
    }
    answers[room] = roomValues;*/
    answers[room] = [];
    socket.to(room).emit("join_game", "buffer");
    setTimeout(() => {
      io.to(room).emit("setQuestions", questions);
    }, 0.5 * 1000);
  });

  socket.on("check-answer", (object, room) => {
    answers[room].push(object);
    console.log("answers", answers[room], answers[room].length);
    console.log("room", roomIds[room], roomIds[room].length);
    if (answers[room].length !== roomIds[room].length) {
      console.log("not all responses received");
      return;
    } else {
      console.log("all received");
      console.log("feedback", answers[room]);
      io.to(Number(room)).emit("feedback", answers[room]);
      setTimeout(() => {
        io.to(Number(room)).emit("increase_index", answers[room]);
        answers[room] = [];
      }, 5.5 * 1000);
    }
  });

  socket.on("create-room", (room, name) => {
    socket.join(Number(room));
    console.log(`room created ${room}`);
    // console.log(`${socket.id} created ${room}`);
    roomIds[room] = [{ id: socket.id, name: name }];
    console.log(`add room ${JSON.stringify(roomIds)}`);
    socket.emit("confirm-create-room", room);
  });

  socket.on("join-room", (room, name) => {
    if (!roomIds[room]) {
      return;
    }
    socket.join(Number(room));
    console.log(`room joined ${room}`);
    roomIds[room].push({ id: socket.id, name: name });
    console.log(`join room ${JSON.stringify(roomIds)}`);
    //shows room to sender
    socket.emit("join-confirmation-joiner", room);
    //sends other players to other rooms
    io.to(Number(room)).emit("join-confirmation", roomIds[room]);
    //io.to(roomIds[room][0].id).emit("join-confirmation", roomIds[room]);
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
      console.log("room specific", roomIds[room]);
      let newRoom = roomIds[room].filter((user) => {
        return user.id !== socket.id;
      });
      roomIds[room] = newRoom;
      if (roomIds[room].length === 0) {
        delete roomIds[room];
      }
    }

    console.log(`rooms after disconnect ${JSON.stringify(roomIds)}`);
  });
};

const roomIds = {};

let quizQuestions = {};
let answers = {};
let questionIndex = {};
let timers = {};
let shortTimers = {};
/*
store-
const = [question 1: [{user: playerOne, time: 20sec, correct: false}], question 2: [{user: playerOne, time: 20sec, correct: false}] ] 
const answers= {room1: {question 1: [{user: playerOne, time: 20sec, correct: false}], question 2: [{user: playerOne, time: 20sec, correct: false}] }}
questions= [{},{}]

const quizQuestions = {room: questions, room: questions}
const questionIndex: {room: index, room: index}
const timer = {room: timer}
*/

module.exports = (io, socket) => {
  console.log("socket id:", socket.id);

  socket.on("game_connection", (questions, room) => {
    //console.log("questions", questions);
    console.log("game connection");
    quizQuestions[room] = questions;
    questionIndex[room] = 0;
    let roomValues = {};
    for (let i = 0; i <= questions.length - 1; i++) {
      roomValues[Number(i)] = [];
    }
    answers[room] = roomValues;
    io.to(room).emit("question", quizQuestions[room][questionIndex[room]]);

    socket.on("check-answer", (object) => {
      console.log("before", answers);
      answers[room][questionIndex[room]].push(object);
      console.log("after", answers);
      let answersArray = answers[room][questionIndex[room]];

      if (answersArray.length !== roomIds[room].length * 2) {
        console.log("not all responses received");
        return;
      }
      console.log("all received");
      console.log("feedback", answers[room][questionIndex[room]]);
      io.to(room).emit("feedback", answers[room][questionIndex[room]]);
      setTimeout(() => {
        questionIndex[room] += 1;
        io.to(room).emit("question", quizQuestions[room][questionIndex[room]]);
      }, 2 * 1000);
      //console.log("answers", answers[room][questionIndex[room]]);
      // answers[room].questionIndex[room].push(object);
      //  console.log("answers updated", answers);
    });
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

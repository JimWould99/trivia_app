const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

const triviaRouter = require("./routes/trivia");
const triviaUserRouter = require("./routes/trivia_user");
const userRouter = require("./routes/users");

app.listen(3006, () => {
  console.log("listing on port 3006");
});

app.use("/users", userRouter);

app.use("/", triviaRouter);

app.use("/trivia_user", triviaUserRouter);

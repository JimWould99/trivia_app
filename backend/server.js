const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

const mainRouter = require("./routes/trivia");
const userRouter = require("./routes/users");

app.listen(3006, () => {
  console.log("listing on port 3006");
});

app.use("/users", userRouter);

app.use("/", mainRouter);
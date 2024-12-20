const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
const userExists = async (inputEmail) => {
  const exists = await prisma.user.findUnique({
    where: {
      email: inputEmail,
    },
  });
  return exists;
};
exports.add_user = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Not a valid email" });
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
  ) {
    return res.status(400).json({
      error:
        "Password must be stronger (minimum 8 characters, 1 capital, 1 number)",
    });
  }
  if (await userExists(email)) {
    return res.status(400).json({ error: "email in use" });
  }
  salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const new_user = await prisma.user.create({
    data: {
      email,
      password: hash,
      no_quiz_completed: 0,
      no_quiz_won: 0,
      questions_completed: 0,
      questions_correct: 0,
    },
  });
  let id = new_user.id;
  const token = createToken(new_user.id);
  res.json({ email, token, id });
};
exports.login_user = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  const user = await userExists(email);
  if (!user) {
    return res.status(400).json({ error: "Incorrect email or password" });
  }
  const match = bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Incorrect email or password" });
  }
  // create a token
  const token = createToken(user.id);
  res.json({ email, token });
};

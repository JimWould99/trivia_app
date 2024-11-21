const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.add_quiz = async (req, res) => {
  let { name } = req.body;
  const { id } = req.user;
  const new_quiz = await prisma.quiz.create({
    data: {
      name,
      userId: id,
    },
  });
  // console.log(new_budget);
  res.json({ new_quiz });
};

exports.add_question = async (req, res) => {
  let {
    question,
    answerOne,
    answerTwo,
    answerThree,
    answerFour,
    correctAnswer,
    quizId,
  } = req.body;
  const { id } = req.user;
  const new_question = await prisma.question.create({
    data: {
      question,
      answerOne,
      answerTwo,
      answerThree,
      answerFour,
      correctAnswer,
      quizId,
      userId: id,
    },
  });
  res.json({ new_question });
};

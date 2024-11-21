const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  getQuestions,
  CategoryNames,
  QuestionDifficulties,
} = require("open-trivia-db");

exports.display_quizzes = async (req, res) => {
  const { id } = req.user;

  const quizzes = await prisma.quiz.findMany({
    where: {
      userId: id,
    },
    orderBy: { createdAt: "asc" },
  });

  res.json({ quizzes });
};

exports.display_questions = async (req, res) => {
  const { id } = req.user;

  const questions = await prisma.question.findMany({
    where: {
      quizId: req.body.quizId,
    },
    orderBy: { createdAt: "asc" },
  });

  res.json({ questions });
};

exports.questions_api = async (req, res) => {
  const questions = await getQuestions({
    amount: 10,
    // category: CategoryNames.Animals,
    difficulty: QuestionDifficulties.Medium,
    type: "multiple",
  });

  res.json({ questions });
};

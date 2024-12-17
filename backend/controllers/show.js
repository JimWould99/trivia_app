const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {
  getQuestions,
  CategoryNames,
  QuestionDifficulties,
} = require("open-trivia-db");

exports.display_user_quizzes = async (req, res) => {
  const { id } = req.user;

  const quizzes = await prisma.quiz.findMany({
    where: {
      userId: id,
    },
    orderBy: { createdAt: "asc" },
  });

  res.json({ quizzes });
};

exports.display_all_quizzes = async (req, res) => {
  const quizzes = await prisma.quiz.findMany({
    take: 3,
    orderBy: { createdAt: "asc" },
  });

  res.json({ quizzes });
};

exports.display_questions = async (req, res) => {
  const questions = await prisma.question.findMany({
    where: {
      quizId: req.body.quizId,
    },
    orderBy: { createdAt: "asc" },
  });

  res.json({ questions });
};

exports.questions_api = async (req, res) => {
  console.log("api call");
  try {
    const response = await getQuestions({
      amount: 10,
      category: CategoryNames["General Knowledge"],
      difficulty: QuestionDifficulties.Medium,
      type: "multiple",
    });
    res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.questions_api_animals = async (req, res) => {
  try {
    const response = await getQuestions({
      amount: 10,
      category: CategoryNames["Animals"],
      difficulty: QuestionDifficulties.Medium,
      type: "multiple",
    });
    res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.questions_api_geo = async (req, res) => {
  try {
    const response = await getQuestions({
      amount: 10,
      category: CategoryNames["Geography"],
      difficulty: QuestionDifficulties.Medium,
      type: "multiple",
    });
    res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.questions_api_history = async (req, res) => {
  try {
    const response = await getQuestions({
      amount: 10,
      category: CategoryNames["History"],
      difficulty: QuestionDifficulties.Medium,
      type: "multiple",
    });
    res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.questions_api_politics = async (req, res) => {
  try {
    const response = await getQuestions({
      amount: 10,
      category: CategoryNames["Politics"],
      difficulty: QuestionDifficulties.Medium,
      type: "multiple",
    });
    res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.update_user_stats = async (req, res) => {
  const { id } = req.user;
  // note- quiz_won= 0 0r 1
  const { quiz_won, no_answered, no_correct } = req.body;
  const current_user = await prisma.user.findUnique({
    where: { id: id },
  });
  const updateUser = await prisma.user.update({
    where: { id: id },
    data: {
      no_quiz_completed: current_user.no_quiz_completed + 1,
      no_quiz_won: current_user.no_quiz_won + quiz_won,
      questions_completed: current_user.questions_completed + no_answered,
      questions_correct: current_user.questions_correct + no_correct,
    },
  });
  res.json({ updateUser });
};

const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

const display_controller = require("../controllers/show");
const add_controller = require("../controllers/add");

router.post("/show_quizzes", display_controller.display_quizzes);
router.post("/show_questions", display_controller.display_questions);
// trivia api
router.get("/questions_api", display_controller.questions_api);

router.post("/add_quiz", add_controller.add_quiz);
router.post("/add_question", add_controller.add_question);

module.exports = router;

const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

//router.use(requireAuth);

const display_controller = require("../controllers/show");

router.get("/show_quizzes", display_controller.display_all_quizzes);
router.post("/show_questions", display_controller.display_questions);
// trivia api
router.get("/questions_api", display_controller.questions_api);

module.exports = router;

const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

const display_controller = require("../controllers/show");
const add_controller = require("../controllers/add");

router.post("/show_user_quizzes", display_controller.display_user_quizzes);

router.post("/add_quiz", add_controller.add_quiz);
router.post("/add_question", add_controller.add_question);

module.exports = router;

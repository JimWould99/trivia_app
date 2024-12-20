const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

const display_controller = require("../controllers/show");
const add_controller = require("../controllers/add");
const update_controller = require("../controllers/update");
const show_controller = require("../controllers/show");

router.post("/show_user_quizzes", display_controller.display_user_quizzes);

router.post("/add_quiz", add_controller.add_quiz);
router.post("/add_question", add_controller.add_question);
router.get("/show_stats", show_controller.show_user_stats);

router.post("/update_user", update_controller.update_user_stats);

module.exports = router;

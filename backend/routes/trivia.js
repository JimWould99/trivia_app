const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

//router.use(requireAuth);

const display_controller = require("../controllers/show");
const update_controller = require("../controllers/update");

router.get("/show_quizzes", display_controller.display_all_quizzes);
router.post("/show_questions", display_controller.display_questions);
// trivia api
router.get("/questions_api_general", display_controller.questions_api);
router.get("/questions_api_animals", display_controller.questions_api_animals);
router.get("/questions_api_geography", display_controller.questions_api_geo);
router.get("/questions_api_history", display_controller.questions_api_history);
router.get(
  "/questions_api_politics",
  display_controller.questions_api_politics
);

module.exports = router;

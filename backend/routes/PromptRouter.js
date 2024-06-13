const express = require("express");
const router = express.Router();
const PromptController = require("../controllers/PromptController");

router.post("/create", PromptController.createPrompt)
router.get("/get-detail/:id", PromptController.createPrompt)

module.exports = router;
const express = require("express");
const router = express.Router();
const PromptController = require("../controllers/PromptController");

router.post("/create", PromptController.createPrompt)
router.get("/get-prompt/:id", PromptController.createPrompt)
router.get("/get-all-prompt", PromptController.getAllPromptDetail)
router.delete("/delete/:id", PromptController.deletePrompt)

module.exports = router;
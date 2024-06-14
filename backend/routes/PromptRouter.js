const express = require("express");
const router = express.Router();
const PromptController = require("../controllers/PromptController");

//create a prompt which will return a result from Gemini API
router.post("/create", PromptController.createPrompt)

//get a prompt information (the content and result of prompt)
router.get("/get/:id", PromptController.getPromptDetail)

//get all prompt 
router.get("/get-all", PromptController.getAllPromptDetail)

//delete a prompt with that prompt id
router.delete("/delete/:id", PromptController.deletePrompt)

module.exports = router;
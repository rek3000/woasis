const PromptRouter = require("./PromptRouter");

const routes = (app) => {
  app.use("/api/prompt", PromptRouter)
};

module.exports = routes;
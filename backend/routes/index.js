const PromptRouter = require("./PromptRouter");
const UserRouter = require("./UserRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter)
  app.use("/api/prompt", PromptRouter)
};

module.exports = routes;
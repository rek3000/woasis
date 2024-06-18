const PromptRouter = require("./PromptRouter");
const UserRouter = require("./UserRouter");
const ChatRouter = require("./ChatRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter)
  app.use("/api/prompt", PromptRouter)
  app.use("/api/chat", ChatRouter)
};

module.exports = routes;
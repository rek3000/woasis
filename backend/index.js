const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
app.use(express.urlencoded( { extended: true }));
app.use(express.json());
app.use(multer().none());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server-side error!");
})

app.get("/api/test", async (req, res) => {
  return res.send("API TEST");
});

app.listen(8000);

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const OAuth2Service = require("./services/OAuth2Service");
const authMiddleware = require("./middleware/authMiddleware");
const axios = require("axios");

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.options(
  "*",
  cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 })
);
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server-side error!");
});

app.get("/auth/url", (_, res) => {
  res.json({
    url: OAuth2Service.getAuthUrl(),
  });
});

app.get("/auth/token", async (req, res) => {
  const { code } = req.query;
  if (!code)
    return res
      .status(400)
      .json({ message: "Authorization code must be provided" });

  try {
    const id_token = await OAuth2Service.getToken(code);
    if (!id_token) return res.status(400).json({ message: "Auth error" });

    const { email, name, picture } = OAuth2Service.getUserFromToken(id_token);
    const user = await OAuth2Service.createOrUpdateUser({ email, name, picture });
    
    const token = OAuth2Service.createToken(user);

    res.cookie("token", token, {
      maxAge: process.env.TOKEN_EXPIRATION || 36000,
      httpOnly: true,
    });

    res.json({ user });
  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
});

app.get("/auth/logged_in", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });

    const { user } = OAuth2Service.verifyToken(token);
    const newToken = OAuth2Service.createToken(user);

    res.cookie("token", newToken, {
      maxAge: process.env.TOKEN_EXPIRATION || 36000,
      httpOnly: true,
    });

    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});

app.post("/auth/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

// Example protected route
app.get("/user/posts", authMiddleware, async (req, res) => {
  try {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
    res.json({ posts: data?.slice(0, 5) });
  } catch (err) {
    console.error("Error: ", err);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected to database successfully.");
  })
  .catch((error) => {
    console.log(error);
  });

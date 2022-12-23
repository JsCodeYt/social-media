const express = require("express");
const cors = require("cors");
const connect = require("./config/connect");
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/User");
const postRoute = require("./routes/Post");

require("dotenv").config();
const app = express();
app.use(cors({ origin: "*" }));

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(5000, () => {
  try {
    connect();
  } catch (err) {
    console.log(err);
  }
});

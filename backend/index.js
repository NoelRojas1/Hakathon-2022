if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const userRouter = require("./routes/userRouter.js");

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
mongoose.connect("mongodb://localhost:27017/hackathon-2022", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

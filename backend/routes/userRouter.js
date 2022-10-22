const { response } = require("express");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

const userRouter = express.Router();

userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

module.exports = userRouter;

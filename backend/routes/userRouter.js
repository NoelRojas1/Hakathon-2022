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

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
        return;
      }
      res.status(401).send({ message: "Invalid email or password" });
    }
    User.create;
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({
      name: name,
      email: email,
      password: password,
    });

    const createdUser = await user.save();

    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
    });
  })
);

module.exports = userRouter;

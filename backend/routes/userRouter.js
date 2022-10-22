const { response } = require("express");
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const Symptom = require("../models/symptomModel.js");

const userRouter = express.Router();

userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
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

userRouter.put(
  "/edit/:id",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById({ _id: id });

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();

      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

userRouter.get(
  "/symptoms/:id",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const user = await User.findOne({ _id: id }).populate("symptoms");

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

userRouter.post(
  "/:id/add/symptom",
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = User.findOne({ _id: id });
    console.log(user);

    if (user) {
      const { name, painLevel } = req.body;
      const symptom = new Symptom({
        name: name,
        painLevel: painLevel,
      });

      const createdSymptom = await symptom.save();
      console.log(createdSymptom);

      const updatedUser = await User.updateOne(
        { _id: id },
        { $push: { symptoms: symptom } },
        { new: true }
      );

      res.send({ user: updatedUser });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

module.exports = userRouter;

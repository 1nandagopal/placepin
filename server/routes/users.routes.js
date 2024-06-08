const express = require("express");

const catchAsync = require("../utils/catchAsync");
const { signupUser, loginUser } = require("../controllers/users.controllers");
const { loginValidations, signupValidations } = require("../utils/validators");

const userRouter = express.Router();

userRouter.post("/signup", signupValidations, catchAsync(signupUser));
userRouter.post("/login", loginValidations, catchAsync(loginUser));

module.exports = userRouter;

const express = require("express");

const catchAsync = require("../utils/catchAsync");
const { signupUser, loginUser } = require("../controllers/users.controllers");

const userRouter = express.Router();

userRouter.post("/signup", catchAsync(signupUser));
userRouter.post("/login", catchAsync(loginUser));

module.exports = userRouter;

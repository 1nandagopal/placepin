const express = require("express");

const catchAsync = require("../utils/catchAsync");
const { signupUser } = require("../controllers/users.controllers");

const userRouter = express.Router();

userRouter.post("/signup", catchAsync(signupUser));

module.exports = userRouter;

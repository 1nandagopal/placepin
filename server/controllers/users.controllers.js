const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

const User = require("../models/users.model");
const CustomError = require("../models/customError");

//User SignUp

module.exports.signupUser = async (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    return next(new CustomError(errors[0].msg, 422));
  }

  const { userName, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return next(new CustomError("User already exists, cannot signup.", 409));

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    userName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_KEY, {
    expiresIn: "6h",
  });

  return res
    .status(201)
    .json({ userId: newUser.id, email: newUser.email, token });
};

//User Login

module.exports.loginUser = async (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length !== 0) {
    return next(new CustomError(errors[0].msg, 422));
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new CustomError("Invalid credentails", 401));

  const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
    expiresIn: "6h",
  });

  return res.status(200).json({ userId: user.id, email: user.email, token });
};

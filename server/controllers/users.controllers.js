const bcrypt = require("bcrypt");

require("dotenv").config();

const User = require("../models/users.model");
const CustomError = require("../models/customError");

//User SignUp

module.exports.signupUser = async (req, res, next) => {
  console.log("reached");

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

  return res.status(201).json({ userId: newUser.id, email: newUser.email });
};

//User Login

module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new CustomError("Invalid credentails", 401));

  return res.status(200).json({ userId: user.id, email: user.email });
};

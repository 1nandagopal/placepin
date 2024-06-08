const { body } = require("express-validator");

const userNameValidations = () =>
  body("userName")
    .notEmpty()
    .bail()
    .withMessage("Username cannot be empty")
    .isLength({ max: 15 })
    .withMessage("Username must be atmost 15 chars long")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("Username can only contain alphanumeric chars ");

const emailValidations = () =>
  body("email")
    .notEmpty()
    .bail()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail();

const passwordValidations = () =>
  body("password")
    .notEmpty()
    .bail()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 chars long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit");

module.exports.signupValidations = [
  userNameValidations(),
  emailValidations(),
  passwordValidations(),
];

module.exports.loginValidations = [emailValidations(), passwordValidations()];

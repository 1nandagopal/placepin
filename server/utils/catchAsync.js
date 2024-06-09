const CustomError = require("../models/customError");

const catchAsync = (cb) => {
  return (req, res, next) => {
    try {
      cb(req, res, next);
    } catch (error) {
      // console.log(error);
      next(new CustomError(error.message, error.code));
    }
  };
};

module.exports = catchAsync;

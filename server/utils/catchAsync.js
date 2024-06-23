const CustomError = require("../models/customError");

const catchAsync = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = catchAsync;

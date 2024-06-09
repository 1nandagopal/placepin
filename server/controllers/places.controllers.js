const mongoose = require("mongoose");

const User = require("../models/users.model");
const Place = require("../models/places.model");
const CustomError = require("../models/customError");

module.exports.createPlace = async (req, res, next) => {
  const { creator, title, description, address } = req.body;
  // const creator = req.user.userId;

  const user = await User.findById(creator);
  if (!user)
    return next(new CustomError("User not found, can not create place.", 404));

  if (!req.file)
    return next(new CustomError("Image not found, can not create place.", 404));

  const newPlace = new Place({
    title,
    description,
    image: req.file.path,
    address,
    creator,
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  await newPlace.save({ session });
  user.places.push(newPlace);
  await user.save({ session });
  await session.commitTransaction();

  return res.status(201).json(newPlace.toObject({ getters: true }));
};

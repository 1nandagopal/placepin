const mongoose = require("mongoose");

const User = require("../models/users.model");
const Place = require("../models/places.model");
const CustomError = require("../models/customError");

//Get all places

module.exports.getAllPlaces = async (req, res, next) => {
  let places = await Place.find({}).populate("creator", "userName");

  return res
    .status(200)
    .json({ places: places.map((place) => place.toObject({ getters: true })) });
};

//Get a place by id

module.exports.getPlaceById = async (req, res, next) => {
  let place = await Place.findById(req.params.placeId).populate(
    "creator",
    "userName"
  );

  if (!place) return next(new CustomError("Place not found!", 404));

  return res.status(200).json(place.toObject({ getters: true }));
};

//Get place by userId.

module.exports.getPlacesByUserId = async (req, res, next) => {
  const { userId } = req.params;

  let user = await User.findById(userId).populate("places");

  if (!user) return next(new CustomError("User not found", 404));

  return res.status(200).json({
    places: user.places.map((place) => place.toObject({ getters: true })),
  });
};

//Create a place

module.exports.createPlace = async (req, res, next) => {
  const { title, description, address } = req.body;
  const creator = req.user.userId;

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

//Update place

module.exports.updatePlace = async (req, res, next) => {
  const { title, description, address } = req.body;
  const creator = req.user.userId;

  let user = await User.findById(creator);
  if (!user)
    return next(new CustomError("User not found, can not update place.", 404));

  let place = await Place.findById(req.params.placeId);
  if (place.creator.toString() !== req.user.userId)
    return next(new CustomError("Unauthorised action.", 401));

  place.title = title;
  place.description = description;
  place.address = address;

  await place.save();

  return res.status(200).json(place.toObject({ getters: true }));
};

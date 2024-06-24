const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const catchAsync = require("../utils/catchAsync");
const {
  getAllPlaces,
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/places.controllers");
const CustomError = require("../models/customError");
const { placeValidations } = require("../utils/validators");
const uploadImage = require("../utils/multer");
const { checkExact } = require("express-validator");

const placesRouter = express.Router();

placesRouter.get("/", catchAsync(getAllPlaces));
placesRouter.get("/:placeId", catchAsync(getPlaceById));
placesRouter.get("/user/:userId", catchAsync(getPlacesByUserId));

placesRouter.use((req, res, next) => {
  if (req.method === "OPTIONS") return next();
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.user = { userId: decodedToken.userId };
    next();
  } catch (error) {
    next(new CustomError("Invalid credentials.", 401));
  }
});

placesRouter.post(
  "/new",
  uploadImage("image"),
  placeValidations,
  checkExact([], { message: "Unknown fields detected" }),
  catchAsync(createPlace)
);
placesRouter.patch(
  "/:placeId",
  placeValidations,
  checkExact([], { message: "Unknown fields detected" }),
  catchAsync(updatePlace)
);
placesRouter.delete("/:placeId", catchAsync(deletePlace));

module.exports = placesRouter;

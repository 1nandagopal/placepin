const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const fileUpload = require("../utils/multer");
const {
  getAllPlaces,
  getPlaceById,
  getPlacesByUserId,
  createPlace,
} = require("../controllers/places.controllers");
const CustomError = require("../models/customError");

const placesRouter = express.Router();

placesRouter.get("/", getAllPlaces);
placesRouter.get("/:placeId", getPlaceById);
placesRouter.get("/user/:userId", getPlacesByUserId);

placesRouter.use((req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.user = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return next(new CustomError("Authentication failed.", 400));
  }
});

placesRouter.post("/new", fileUpload.single("image"), createPlace);

module.exports = placesRouter;

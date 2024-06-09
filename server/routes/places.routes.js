const express = require("express");
require("dotenv").config();

const fileUpload = require("../utils/multer");
const {
  getAllPlaces,
  getPlaceById,
  getPlacesByUserId,
  createPlace,
} = require("../controllers/places.controllers");

const placesRouter = express.Router();

placesRouter.get("/", getAllPlaces);
placesRouter.get("/:placeId", getPlaceById);
placesRouter.get("/user/:userId", getPlacesByUserId);
placesRouter.post("/new", fileUpload.single("image"), createPlace);

module.exports = placesRouter;

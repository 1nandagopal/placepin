const express = require("express");
require("dotenv").config();

const fileUpload = require("../utils/multer");
const {
  getAllPlaces,
  createPlace,
} = require("../controllers/places.controllers");

const placesRouter = express.Router();

placesRouter.get("/", getAllPlaces);
placesRouter.post("/new", fileUpload.single("image"), createPlace);

module.exports = placesRouter;

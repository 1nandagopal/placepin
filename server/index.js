const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const express = require("express");

const { mongoConnect } = require("./utils/mongo");
const userRouter = require("./routes/users.routes");
const placesRouter = require("./routes/places.routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/user", userRouter);
app.use("/api/places", placesRouter);

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
    });
  }

  if (res.headerSent) return next(error);

  res.status(error?.code || 500);
  return res.json({
    message: error.message || "Something went wrong! Try again.",
  });
});

(async () => {
  await mongoConnect();
  app.listen(process.env.PORT || 5000, () => {
    console.info("Server started", process.env.PORT || 5000);
  });
})();

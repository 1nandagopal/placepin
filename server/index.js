const fs = require("fs");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const { mongoConnect } = require("./utils/mongo");
const userRouter = require("./routes/users.routes");
const placesRouter = require("./routes/places.routes");

const app = express();

app.use(helmet());
app.use(express.json({ limit: 1024 }));

app.use(
  cors({
    origin: "https://placepin.vercel.app/",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use("/api/user", userRouter);
app.use("/api/places", placesRouter);

app.use((error, req, res, next) => {
  if (req.file && fs.existsSync(req.file)) {
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

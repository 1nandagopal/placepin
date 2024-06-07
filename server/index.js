const morgan = require("morgan");
const express = require("express");

const { mongoConnect } = require("./utils/mongo");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);

  res.status(error.code || 500);
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

const morgan = require("morgan");
const express = require("express");

const { mongoConnect } = require("./utils/mongo");

const app = express();

app.use(morgan("dev"));

(async () => {
  await mongoConnect();
  app.listen(process.env.PORT || 5000, () => {
    console.info("Server started", process.env.PORT || 5000);
  });
})();

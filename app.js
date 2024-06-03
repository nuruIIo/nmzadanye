const express = require("express");
const cookieParser = require("cookie-parser");
const mainRoute = require("./routes/index");
const sequelize = require("./config/db");
require("dotenv").config();
const errorHandling = require("./middleware/errorHandler");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api", mainRoute);

app.use(errorHandling);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
}

start();

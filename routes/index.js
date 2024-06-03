const express = require("express");
const router = express.Router();
const userRoute = require("./userRoutes");

router.use("/user", userRoute);

module.exports = router;

const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/userController");
const userPolice = require("../middleware/userPolice");

const router = express.Router();

// Register user
router.post(
  "/register",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser
);

// Login user
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  userController.loginUser
);

// Update user profile
router.put("/profile/:id", userController.updateUserProfile);

// Get user profile
router.get("/profile/:id", userPolice, userController.getUserProfile);

// Get all user profiles with pagination
router.get("/profiles", userPolice, userController.getAllUserProfiles);

module.exports = router;

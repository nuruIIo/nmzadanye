const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwtService = require("../services/jwtService");
const fs = require("fs");
const path = require("path");

exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if the user already exists
    let existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 7);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      registration_date: new Date(),
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT tokens
    const payload = { userId: user.id };
    const tokens = jwtService.generateTokens(payload);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, last_name, email, gender } = req.body;
    let { photo } = req.body;

    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if photo is provided and validate file type
    if (photo) {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const extension = path.extname(photo).toLowerCase().substring(1); // Get file extension
      if (!allowedExtensions.includes(extension)) {
        return res
          .status(400)
          .json({ error: "File must be a JPG or PNG image" });
      }
    }

    // Update user details
    const [rowsUpdated, updatedUsers] = await User.update(
      { name, last_name, email, gender, photo },
      { where: { id }, returning: true }
    );

    if (rowsUpdated === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = updatedUsers[0];

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUserProfiles = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    // Fetch users with pagination
    const users = await User.findAll({ offset, limit: parseInt(limit) });

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

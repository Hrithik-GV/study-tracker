const mongoose = require('mongoose');
const user = require('../models/user');
const bcrypt = require('bcryptjs');

// GET /api/auth/login
exports.getLogin = (req, res, next) => {
  res.status(200).json({ message: "Login Page" });
};

// POST /api/auth/login
exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const foundUser = await user.findOne({ email });

    if (!foundUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Attach session flags and user info to req.session
    req.session.isLoggedIn = true;
    req.session.user = {
      id: foundUser._id,
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
    };

    // Save session to MongoDB before returning response
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          console.error("Session saving failed internally:", err);
          return reject(err);
        }
        resolve();
      });
    });

    res.status(200).json({
      message: "Login successful",
      user: req.session.user
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login", details: err.message });
  }
};

// GET /api/auth/signup
exports.getSignup = (req, res, next) => {
  res.status(200).json({ message: "Signup Page" });
};

// POST /api/auth/signup
exports.postSignup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ error: "First name, email, and password are required" });
    }

    const existingUser = await user.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new user({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Attach session flags and user info on signup as well
    req.session.isLoggedIn = true;
    req.session.user = {
      id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };

    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          console.error("Session saving failed internally on signup:", err);
          return reject(err);
        }
        resolve();
      });
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during registration", details: err.message });
  }
};

// GET /api/auth/:userId
exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    if (!req.session || !req.session.isLoggedIn || !req.session.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in first." });
    }

    if (req.session.user.id.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Forbidden. Access denied." });
    }

    const foundUser = await user.findById(userId).select('-password');
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        id: foundUser._id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
      },
    });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ error: "Failed to fetch user", details: err.message });
  }
};

exports.postLogout = (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.status(200).json({ message: "Logged out successfully" });
    });
  } else {
    res.clearCookie('connect.sid', { path: '/' });
    res.status(200).json({ message: "Logged out successfully" });
  }
};

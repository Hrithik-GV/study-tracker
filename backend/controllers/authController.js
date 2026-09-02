const user = require('../models/user');

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

    const foundUser = await user.findOne({ email, password });

    if (foundUser) {
      res.status(200).json({
        message: "Login successful",
        user: {
          id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
        },
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
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

    const newUser = new user({
      firstName,
      lastName,
      email,
      password,
    });

    await newUser.save();

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

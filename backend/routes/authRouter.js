const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const isAuth = require('../middleware/isAuth');
// Login Routes
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

// Signup Routes
authRouter.get("/signup", authController.getSignup);
authRouter.post("/signup", authController.postSignup);

// Logout route
authRouter.post("/logout", authController.postLogout);

// Get user by ID route
authRouter.get("/:userId", isAuth, authController.getUserById);

exports.authRouter = authRouter;
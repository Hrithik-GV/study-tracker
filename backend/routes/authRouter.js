const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

// Login Routes
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

// Signup Routes
authRouter.get("/signup", authController.getSignup);
authRouter.post("/signup", authController.postSignup);

exports.authRouter = authRouter;
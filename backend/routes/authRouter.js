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

//logout route
authRouter.post("/logout",isAuth,authController.postLogout)

exports.authRouter = authRouter;
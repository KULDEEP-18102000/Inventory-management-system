const express = require("express");

const router = express.Router();

const { body, validationResult } = require("express-validator");

const userController = require("../controllers/user");

//for signing up the user
router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  userController.signUp
);

//for logging in the user
router.post("/login", userController.login);

module.exports = router;

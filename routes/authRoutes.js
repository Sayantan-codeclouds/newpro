const express = require("express");
const passport = require("passport");
const { loginSuccess } = require("../controllers/authController");

const router = express.Router();

// Initiate Google OAuth process with required scope
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Ensure both 'profile' and 'email' scopes are included
  })
);

// Google OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  loginSuccess
);

module.exports = router;

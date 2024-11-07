const jwt = require("jsonwebtoken");
const AllowedUser = require("../models/AllowedUser"); // Ensure we're using AllowedUser

const loginSuccess = (req, res) => {
  const user = req.user;
  if (!user) {
    console.log("User not found or not allowed");
    return res.status(401).json({ message: "Access Denied: User not allowed" });
  }

  console.log("User found:", user.email);

  // Generate JWT
  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  console.log("JWT generated:", token);

  // Send token as JSON instead of redirect
  res.json({ token });
};

module.exports = { loginSuccess };

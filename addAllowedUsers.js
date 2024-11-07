require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/AllowedUser"); // Assuming User model is in models/User.js

const allowedEmails = ["ramesh.sarkar@codeclouds.com"];

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    for (const email of allowedEmails) {
      try {
        const user = new User({ email });
        await user.save();
        console.log(`Added ${email} to allowed users.`);
      } catch (error) {
        if (error.code === 11000) {
          // Duplicate error code
          console.log(`User with email ${email} already exists.`);
        } else {
          console.error(`Error adding user ${email}:`, error);
        }
      }
    }

    mongoose.connection.close();
  })
  .catch((error) => console.error("MongoDB connection error:", error));

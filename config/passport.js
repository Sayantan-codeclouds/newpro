const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AllowedUser = require("../models/AllowedUser");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const allowedUser = await AllowedUser.findOne({ email });

        if (allowedUser) {
          done(null, allowedUser);
        } else {
          done(null, false); // User not allowed
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);

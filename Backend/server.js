// Import dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { Strategy as OAuthStrategy } from "passport-google-oauth2";
import { connectDB } from "./configs/db.js";
import { User } from "./models/userModel.js";

// Configure dotenv to load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
dbConnect();

// Passport Google OAuth Strategy
passport.use(
  new OAuthStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SEC,
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: ["profile", "email"],
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      // console.log(profile);

      try {
        // Check if user exists in database
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // Create new user if not found
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile._json.email,
            profilePicture: profile._json.picture,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow credentials for session
  })
);

// Parse incoming request bodies in JSON format
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret", // Use env variable for session secret
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error: ", err.stack);
  res.status(500).send("Internal Server Error");
});

// Routes

// Home route
app.get("/home", (req, res) => {
  res.send(`Server is running on port:${PORT} ...!`);
  console.log("Home Endpoint Hit successfully...!");
});

// Google OAuth login route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashbord", // Redirect to dashboard on success
    failureRedirect: "http://localhost:5173/login", // Redirect to login on failure
  })
);

app.get("/login/success", (req, res) => {
  
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user,
    });
    console.log("User-data", req.user);
  } else {
    res.status(400).json({
      success: false, message: "User not found",
    });
    console.log("User not found");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Helper function to connect to MongoDB
function dbConnect() {
  connectDB()
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => {
      console.error("MongoDB connection error: ", err);
      process.exit(1); // Exit process if DB connection fails
    });
}

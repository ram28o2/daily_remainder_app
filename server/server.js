const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const ConnectDB = require("./config/dbConn");
const authRoutes = require("./routes/auth");

const app = express();

// Enable CORS with credentials support
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow credentials (cookies)
}));

// Middleware to parse cookies
app.use(cookieParser());
app.use(express.json()); // Parse incoming JSON requests

ConnectDB(); // Connect to the database


app.use("/api/auth", authRoutes); // Use auth routes for handling authentication
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/db');

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});


app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
  });
  res.status(200).json({ msg: "Logged out successfully" });
});


// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

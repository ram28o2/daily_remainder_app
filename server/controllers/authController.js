const bcrypt = require("bcrypt");
const User = require("../models/db");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.status(400).json("Fill all the details..");

  const existingUser = await User.findOne({ email });

  if (existingUser) return res.status(400).json("Email already exists");

  const hashedPass = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPass });
  
  await newUser.save();

  res.status(201).json({ msg: "Registered..." });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json("Fill all the details");

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json("User not found");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(400).json("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }); // Set token in cookies

  res.status(200).json({ msg: "Logged in successfully", name: user.name, token });
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

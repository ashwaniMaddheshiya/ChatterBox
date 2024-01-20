const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/generateToken");

const signin = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({ error: "Error in checking user existence" });
  }

  if (!existingUser) {
    return res.status(400).json({ error: "No user exist with this email" });
  }

  let checkPassword;
  try {
    checkPassword = await bcryptjs.compare(password, existingUser.password);
  } catch (err) {
    return res.status(500).json({ error: "Unable to check password" });
  }

  if (!checkPassword) {
    return res.status(400).json({ error: "Invalid Password" });
  }

  const token = await generateToken(existingUser._id);

  return res.status(200).json({
    token,
    user: {
      userId: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    },
  });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({ error: "Error in checking user existence" });
  }

  if (existingUser) {
    return res.status(400).json({ error: "User exists already, please login" });
  }

  let hashedPassword = await bcryptjs.hash(password, 12);
  let newUser;
  try {
    newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return res.status(500).json({ error: "Unable to create user" });
  }

  return res.status(200).json({
    user: {
      userId: newUser._id,
      name: newUser.name,
    },
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Unable to fetch users" });
  }
};

const SearchUser = async (req, res) => {
  try {
    const searchText = req.body.searchText;
    const users = await User.find({
      name: { $regex: new RegExp([...searchText].join(".*"), "i") },
    });

    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to search, please search manually" });
  }
};

module.exports = {
  signin,
  signup,
  getAllUsers,
  SearchUser,
};

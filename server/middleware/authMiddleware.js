const jwt = require("jsonwebtoken");

const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ error: "Authorization failed" });
  }

  try {
    const decoded = jwt.decode(token, "letkeepitsecretforthemoment");

    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ error: "Access Denied" });
  }
};

module.exports = { verifyToken };

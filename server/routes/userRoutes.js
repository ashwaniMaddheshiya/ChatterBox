const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const {
  signin,
  signup,
  getAllUsers,
  SearchUser,
} = require("../controllers/userCtrl");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/all", verifyToken, getAllUsers);
router.post("/search", verifyToken, SearchUser);

module.exports = router;

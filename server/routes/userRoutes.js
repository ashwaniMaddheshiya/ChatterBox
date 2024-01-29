const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const {
  signin,
  signup,
  getAllUsers,
  SearchUser,
  getUsersForGivenId,
  SearchUserForId,
} = require("../controllers/userCtrl");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/all", verifyToken, getAllUsers);
router.get("/:userId", verifyToken, getUsersForGivenId);
router.post("/search", verifyToken, SearchUser);
router.post("/search/:userId", verifyToken, SearchUserForId);

module.exports = router;

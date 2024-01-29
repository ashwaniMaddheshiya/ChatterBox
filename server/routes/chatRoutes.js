const express = require("express");
const router = express.Router();

const {
  accessChat,
  fetchChats,
  deleteChat,
} = require("../controllers/chatCtrl");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, accessChat);
router.get("/", verifyToken, fetchChats);
router.delete('/:userId', verifyToken, deleteChat);

module.exports = router;

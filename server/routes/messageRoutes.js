const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const {
  sendMessage,
  allMessages,
  clearAllMessage,
} = require("../controllers/messageCtrl");

router.post("/", verifyToken, sendMessage);
router.get("/:chatId", verifyToken, allMessages);
router.delete("/:chatId", verifyToken, clearAllMessage);

module.exports = router;

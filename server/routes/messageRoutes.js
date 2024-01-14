const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { sendMessage, allMessages } = require("../controllers/messageCtrl");

router.post("/", verifyToken, sendMessage);
router.get("/:chatId", verifyToken, allMessages);

module.exports = router;

const express = require("express");
const router = express.Router();

const { accessChat, fetchChats } = require("../controllers/chatCtrl");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, accessChat);
router.get("/", verifyToken, fetchChats);

module.exports = router;

const Chat = require("../models/Chat");
const User = require("../models/User");

const accessChat = async (req, res) => {
  const { userId } = req.body;

  let isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    return res.status(200).json(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      users: [req.user._id, userId],
    };

    try {
      const createChat = await Chat.create(chatData);
      const fullChat = await Chat.find({ _id: createChat._id }).populate(
        "users",
        "-password"
      );
      return res.status(200).json(fullChat);
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Something went wrong, Please try again later" });
    }
  }
};

const fetchChats = async (req, res) => {
  try {
    const results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    const populatedResults = await User.populate(results, {
      path: "latestMessage.sender",
      select: "name email",
    });

    res.status(200).json(populatedResults);
  } catch (error) {
    res.status(400).json({ error: "Unable to load chats, Please reload" });
  }
};

module.exports = { accessChat, fetchChats };

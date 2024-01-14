const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const msgData = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(msgData);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: "Message cannot be sent, Please try again" });
  }
};

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    return res.status(400).json("Something went wrong");
  }
};

module.exports = { sendMessage, allMessages };

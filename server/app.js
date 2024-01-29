const express = require("express");
const cors = require("cors");

const connectToMongo = require("./utils/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
connectToMongo();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const server = app.listen(5000, () => {
  console.log("Connected to the port 5000");
});

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    try {
      socket.join(userData.userId);
      socket.emit("connected");
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Connection failed! Please reload." });
    }
  });

  socket.on("new-message", (newMessageReceived) => {
    try {
      let chat = newMessageReceived.chat;
      if (!chat.users) throw new Error("chat.users not defined");

      chat.users.forEach((user) => {
        if (user._id === newMessageReceived.sender._id) return;

        console.log(`Emitting message to user ${user._id}`);
        socket.to(user._id).emit("message-received", newMessageReceived);
      });
    } catch (err) {
      return res
        .status(400)
        .json({ error: "Connection failed! Please reload." });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

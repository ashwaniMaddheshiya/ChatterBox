import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";
import io from "socket.io-client";
import { TextField, AppBar, Toolbar, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";

import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";
import MessageCard from "./MessageCard";

let socket, chatInfoCompare;

const ChatBody = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const { chatInfo } = useContext(UserContext);
  const { token, user } = useContext(AuthContext);
  const scroll = useRef();

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("Socket connected");
    });
  }, [user]);

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      console.log("useEffect", newMessageRecieved);
      setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
    });
  });

  const sendMessage = async (event) => {
    if (event.key === "Enter" && inputText.trim() !== "") {
      let response;
      try {
        response = await axios.post(
          "/api/message",
          {
            chatId: chatInfo._id,
            content: inputText,
          },
          { headers: { Authorization: token } }
        );
        socket.emit("new message", response.data);
        const msgData = {
          content: response.data.content,
          sender: {
            name: user.name,
            _id: user.userId,
          },
          chat: {
            _id: chatInfo._id,
            chatName: chatInfo.chatName,
            users: chatInfo.users,
          },
        };
        setMessages((prevMessages) => [...prevMessages, msgData]);

        setInputText("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchMessages();

    // chatInfoCompare = chatInfo;
    // eslint-disable-next-line
  }, [chatInfo]);

  // useEffect(() => {
  //   scroll.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const fetchMessages = async () => {
    if (!chatInfo) return;

    try {
      const response = await axios.get(`/api/message/${chatInfo._id}`, {
        headers: {
          Authorization: token,
        },
      });
      setMessages(response.data);
      socket.emit("join chat", chatInfo._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "4px",
          overflowY: "auto",
          height: "80vh",
        }}
      >
        {messages.map((message) => (
          <MessageCard message={message} key={message._id} />
        ))}
      </Box>

      <AppBar
        position="static"
        color="transparent"
        sx={{ bgcolor: "#414143", boxShadow: "none", bottom: "0" }}
      >
        <Toolbar sx={{ justifyContent: "space-evenly" }}>
          <IconButton color="inherit">
            <AddIcon />
          </IconButton>
          <IconButton color="inherit">
            <InsertEmoticonIcon />
          </IconButton>
          <TextField
            variant="outlined"
            sx={{ width: "90%" }}
            size="small"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={sendMessage}
          />
          <IconButton color="inherit">
            <MicIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ChatBody;

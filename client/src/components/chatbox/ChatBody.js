import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import {
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";

import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";
import MessageCard from "./MessageCard";
import SendFileUi from "./SendFileUi";

let socket;

const ChatBody = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const { chatInfo, isChatCleared, selectUser, setNotification } =
    useContext(UserContext);
  const { token, user } = useContext(AuthContext);
  const scroll = useRef();

  useEffect(() => {
    socket = io(process.env.REACT_APP_SERVER_URL);
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("Socket connected");
    });
  }, [user]);

  useEffect(() => {
    socket.on("message-received", handleNewMessageReceived);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectUser]);

  const handleNewMessageReceived = (newMessageReceived) => {
    if (newMessageReceived.sender._id !== selectUser._id) {
      setNotification((prevNotifications) => ({
        ...prevNotifications,
        [newMessageReceived.sender._id]:
          (prevNotifications[newMessageReceived.sender._id] || 0) + 1,
      }));
    } else {
      setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
    }
  };

  const handleFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleEmojiPicker = () => {
    setEmojiPicker((prev) => !prev);
  };

  const uploadFile = async () => {
    if (selectedFile == null) return null;
    const selecteFileRef = ref(storage, `files/${selectedFile.name + v4()}`);
    await uploadBytes(selecteFileRef, selectedFile);

    const selectedFileUrl = await getDownloadURL(selecteFileRef);
    setInputText(selectedFileUrl);
  };

  const sendMessage = async () => {
    await uploadFile();
    if (!inputText.trim() && !selectedFile) return;
    try {
      const response = await axios.post(
        "/api/message",
        {
          chatId: chatInfo._id,
          content: inputText,
          messageType: selectedFile ? "file" : "text",
        },
        { headers: { Authorization: token } }
      );

      socket.emit("new-message", response.data);
      setMessages((prevMessages) => [...prevMessages, response.data]);
      setInputText("");
      setSelectedFile(null);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [chatInfo, isChatCleared]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    if (!chatInfo) return;

    let response;
    try {
      setIsLoading(true);
      response = await axios.get(`/api/message/${chatInfo._id}`, {
        headers: {
          Authorization: token,
        },
      });
      setMessages(response.data);
      socket.emit("join chat", chatInfo._id);
    } catch (err) {
      toast.error(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {selectedFile ? (
        <SendFileUi fileName={selectedFile.name} sendFile={sendMessage} />
      ) : (
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
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="h6" color="white">
                  Loading Your Messages...
                </Typography>
              </Box>
            ) : messages.length > 0 ? (
              messages.map((message) => (
                <Box
                  key={message._id}
                  ref={scroll}
                  sx={{
                    alignSelf:
                      message.sender._id === user.userId
                        ? "flex-end"
                        : "flex-start",
                    maxWidth: "80%",
                  }}
                >
                  <MessageCard message={message} key={message._id} />
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="body1" color="white">
                  Send a "Hi👋" to start a conversation
                </Typography>
              </Box>
            )}

            {emojiPicker && (
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  setInputText((prev) => prev + emojiData.emoji);
                }}
              />
            )}
          </Box>

          <AppBar
            position="static"
            color="transparent"
            sx={{
              bgcolor: "#27353c",
              color: "#ffffff",
              boxShadow: "none",
              bottom: "0",
            }}
          >
            <Toolbar sx={{ justifyContent: "space-evenly" }}>
              <IconButton color="inherit" onClick={handleEmojiPicker}>
                <InsertEmoticonIcon />
              </IconButton>
              <label htmlFor="file-input">
                <IconButton color="inherit" component="span">
                  <AddIcon />
                </IconButton>
                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>

              <TextField
                variant="outlined"
                sx={{ width: "90%" }}
                size="small"
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
                InputProps={{
                  style: { backgroundColor: "#3c4c57c9", color: "#ffffff" },
                }}
              />
              <IconButton color="inherit" onClick={sendMessage}>
                <SendIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </>
      )}
    </>
  );
};

export default ChatBody;

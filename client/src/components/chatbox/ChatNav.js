import { useContext, useState } from "react";
import axios from "axios";

import {
  AppBar,
  Toolbar,
  Avatar,
  Stack,
  IconButton,
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VideoCallIcon from "@mui/icons-material/VideoCall";

import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";
import PopUpMenu from "../shared/PopUpMenu";
import Modal from "../shared/Modal";
import ProfileModalContent from "../modalsContent/profile/ProfileModalContent";

const ChatNav = () => {
  const { token } = useContext(AuthContext);
  const { selectUser, removeUser, chatInfo, setIsChatCleared } =
    useContext(UserContext);
  const [modalsStack, setModalsStack] = useState([]);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (content, title) => {
    setModalsStack((prevStack) => [...prevStack, content]);
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalsStack((prevStack) => prevStack.slice(0, -1));
  };

  const handleClearChat = async () => {
    try {
      await axios.delete(`/api/message/${chatInfo._id}`, {
        headers: {
          Authorization: token,
        },
      });
      setIsChatCleared(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteChat = async () => {
    try {
      handleClearChat();
      await axios.delete(`/api/chat/${selectUser._id}`, {
        headers: {
          Authorization: token,
        },
      });
      removeUser();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseChat = () => {
    removeUser();
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ bgcolor: "#202c33", color: "#ffffff", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <Avatar alt="User Image" src={selectUser.profile} />
          </IconButton>
          <Typography variant="body">
            {selectUser && selectUser.name}
          </Typography>
        </Box>

        <Stack spacing={1} direction="row">
          <IconButton color="inherit">
            <VideoCallIcon />
          </IconButton>
          <PopUpMenu icon={<MoreVertIcon fontSize="20px" />}>
            <List>
              <ListItemButton
                onClick={() =>
                  openModal(<ProfileModalContent />, "Contact Info")
                }
              >
                <ListItemText primary="Contact Info" />
              </ListItemButton>
              <ListItemButton onClick={handleCloseChat}>
                <ListItemText primary="Close Chat" />
              </ListItemButton>
              <ListItemButton onClick={handleClearChat}>
                <ListItemText primary="Clear Chat" />
              </ListItemButton>
              <ListItemButton onClick={handleDeleteChat}>
                <ListItemText primary="Delete Chat" />
              </ListItemButton>
            </List>
          </PopUpMenu>
          {modalsStack.length > 0 && (
            <Modal open={true} onClose={closeModal} title={modalTitle}>
              {modalsStack[modalsStack.length - 1]}
            </Modal>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default ChatNav;

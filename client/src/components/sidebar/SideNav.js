import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemButton,
} from "@mui/material";

import MessageIcon from "@mui/icons-material/Message";
import PopUpMenu from "../shared/PopUpMenu";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "../shared/Modal";
import SettingModalContent from "../settings/SettingModalContent";

const SideNav = () => {
  const [modalsStack, setModalsStack] = useState([]);
  const [modalTitle, setModalTitle] = useState("Settings");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const openModal = (content, title) => {
    setModalsStack((prevStack) => [...prevStack, content]);
    setModalTitle(title);
  };

  const navigateToSubModal = (subModalContent, title) => {
    openModal(subModalContent, title);
  };

  const closeModal = () => {
    setModalsStack((prevStack) => prevStack.slice(0, -1));
  };

  const logoutHandler = () => {
    logout();
    navigate("/signin");
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ bgcolor: "#414143", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Avatar alt="User Image" src="/path/to/user-image.jpg" />
        </IconButton>

        <Stack spacing={1} direction="row">
          <IconButton size="small" color="inherit">
            <MessageIcon fontSize="20px" />
          </IconButton>
          <PopUpMenu>
            <List>
              <ListItemButton>
                <ListItemText primary="New Group" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Starred Messages" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Select Chats" />
              </ListItemButton>
              <ListItemButton
                onClick={() =>
                  openModal(
                    <SettingModalContent
                      onListItemClick={navigateToSubModal}
                    />,
                    "Settings"
                  )
                }
              >
                <ListItemText primary="Settings" />
              </ListItemButton>
              <ListItemButton onClick={logoutHandler}>
                <ListItemText primary="Logout" />
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

export default SideNav;

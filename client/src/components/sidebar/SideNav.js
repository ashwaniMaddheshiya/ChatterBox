import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppBar, Toolbar, Avatar, Stack, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ThreePIcon from "@mui/icons-material/ThreeP";

import AuthContext from "../../context/AuthContext";
import Modal from "../shared/Modal";
import NewChatModalContent from "../modalsContent/newChat/NewChatModalContent";

const SideNav = () => {
  const [modalsStack, setModalsStack] = useState([]);
  const [modalTitle, setModalTitle] = useState("Settings");
  const { logout,user } = useContext(AuthContext);

  const navigate = useNavigate();

  const openModal = (content, title) => {
    setModalsStack((prevStack) => [...prevStack, content]);
    setModalTitle(title);
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
      sx={{
        boxShadow: "none",
        bgcolor: "#202c33",
        color: "#ffffff",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Avatar alt="User Image" src={user.profile} />
        </IconButton>

        <Stack spacing={1} direction="row">
          <IconButton
            size="small"
            color="inherit"
            onClick={() =>
              openModal(
                <NewChatModalContent onClose={closeModal} />,
                "New Chat"
              )
            }
          >
            <ThreePIcon />
          </IconButton>
          <IconButton size="small" color="inherit" onClick={logoutHandler}>
            <LogoutIcon />
          </IconButton>

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

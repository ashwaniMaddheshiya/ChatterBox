import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import PopUpMenu from "../shared/PopUpMenu";
import { List, ListItemButton, ListItemText } from "@mui/material";
import Modal from "../shared/Modal";

const ChatNav = () => {
  const { selectUser } = useContext(UserContext);
  const [modalsStack, setModalsStack] = useState([]);

  const openModal = (content) => {
    setModalsStack((prevStack) => [...prevStack, content]);
  };

  const closeModal = () => {
    setModalsStack((prevStack) => prevStack.slice(0, -1));
  };
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ bgcolor: "#414143", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <Avatar alt="User Image" src="/path/to/user-image.jpg" />
          </IconButton>
          <Typography variant="body">
            {selectUser && selectUser.name}
          </Typography>
        </Box>

        <Stack spacing={1} direction="row">
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <PopUpMenu>
            <List>
              <ListItemButton onClick={() => openModal("Contact Info")}>
                <ListItemText primary="Contact Info" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Select Messages" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Close Chat" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Clear Chat" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Delete Chat" />
              </ListItemButton>
            </List>
          </PopUpMenu>
          {modalsStack.length > 0 && (
            <Modal open={true} onClose={closeModal} title="Modal Title">
              {modalsStack[modalsStack.length - 1]}
            </Modal>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default ChatNav;

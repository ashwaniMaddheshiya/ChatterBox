import React from "react";
import {
  TextField,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material/TextField";

import AddIcon from "@mui/icons-material/Add";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";

const ChatFooter = () => {
  return (
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
        <TextField variant="outlined" sx={{ width: "90%" }} size="small" />
        <IconButton color="inherit">
          <MicIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ChatFooter;

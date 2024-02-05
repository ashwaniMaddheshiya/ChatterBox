import { Avatar, Box, } from "@mui/material";
import React from "react";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";

const VideoChat = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "space-evenly",
        // alignItems: "center",
        position: "fixed",
      }}
    >
      {/* For self */}
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          width: "15%",
          padding: "8px",
        //   border: "1px solid red",
        }}
      >
          <Avatar sx={{ fontSize: "64px", color: "blue", cursor:"pointer" }}>
          <MicIcon />
          </Avatar>
        <Avatar sx={{ fontSize: "64px", color: "blue", cursor: "pointer" }}>
          <VideocamIcon />
        </Avatar>
        <Avatar sx={{ fontSize: "64px", color: "blue", cursor: "pointer" }}>
          <CallEndIcon />
        </Avatar>
      </Box>

      <Box
        sx={{
          border: "1px solid white",
          width: "300px",
          height: "300px",
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        Self Image
      </Box>
    </Box>
  );
};

export default VideoChat;

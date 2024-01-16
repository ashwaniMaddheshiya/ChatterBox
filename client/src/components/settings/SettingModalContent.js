import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import NotificationModalContent from "./NotificationModalContent";
import SecurityModalContent from "./SecurityModalContent";
import ThemeModalContent from "./ThemeModalContent";
import MediaAutoDownloadsModalContent from "./MediaAutoDownloadsModalContent";

const SettingModalContent = ({ onListItemClick }) => {
  return (
    <List>
      <ListItemButton
        onClick={() =>
          onListItemClick(<NotificationModalContent />, "Notification")
        }
      >
        <ListItemText primary="Notification" />
      </ListItemButton>
      <ListItemButton onClick={() => onListItemClick("Privacy", "Privacy")}>
        <ListItemText primary="Privacy" />
      </ListItemButton>
      <ListItemButton
        onClick={() => onListItemClick(<SecurityModalContent />, "Security")}
      >
        <ListItemText primary="Security" />
      </ListItemButton>
      <ListItemButton
        onClick={() => onListItemClick(<ThemeModalContent />, "Theme")}
      >
        <ListItemText primary="Themes" />
      </ListItemButton>
      <ListItemButton
        onClick={() => onListItemClick("Chat Wallpaper", "Wallpaper")}
      >
        <ListItemText primary="Chat Wallpaper" />
      </ListItemButton>
      <ListItemButton
        onClick={() =>
          onListItemClick(<MediaAutoDownloadsModalContent />, "Media Downloads")
        }
      >
        <ListItemText primary="Media AutoDownloads" />
      </ListItemButton>
      <ListItemButton
        onClick={() => onListItemClick("Request Account Info", "Account Info")}
      >
        <ListItemText primary="Request Account Info" />
      </ListItemButton>
      <ListItemButton onClick={() => onListItemClick("Help", "Help")}>
        <ListItemText primary="Help" />
      </ListItemButton>
    </List>
  );
};

export default SettingModalContent;

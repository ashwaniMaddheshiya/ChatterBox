import React, { useState } from "react";
import { List, ListItemButton, ListItemText, Checkbox } from "@mui/material";

const NotificationModalContent = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (itemName) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemName]: !prevCheckedItems[itemName],
    }));
  };

  return (
    <List>
      <ListItemButton>
        <Checkbox
          checked={checkedItems["Item1"]}
          onChange={() => handleCheckboxChange("Item1")}
        />
        <ListItemText
          primary="Manage Notification"
          secondary="Show Notification for new Messages"
        />
      </ListItemButton>
      <ListItemButton>
        <Checkbox
          checked={checkedItems["Item2"]}
          onChange={() => handleCheckboxChange("Item2")}
        />
        <ListItemText
          primary="BackGroundSync"
          secondary="Get Faster Performance by syncing messages in the background"
        />
      </ListItemButton>
      <ListItemButton>
        <Checkbox
          checked={checkedItems["Item3"]}
          onChange={() => handleCheckboxChange("Item3")}
        />
        <ListItemText
          primary="Sounds"
          secondary="Play sounds for Incoming Messages"
        />
      </ListItemButton>
    </List>
  );
};

export default NotificationModalContent;

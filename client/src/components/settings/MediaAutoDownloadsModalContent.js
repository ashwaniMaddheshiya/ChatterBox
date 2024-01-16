import { Checkbox, List, ListItemButton, ListItemText } from "@mui/material";
import React, { useState } from "react";

const MediaAutoDownloadsModalContent = () => {
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
        <ListItemText primary="Photos" />
      </ListItemButton>
      <ListItemButton>
        <Checkbox
          checked={checkedItems["Item2"]}
          onChange={() => handleCheckboxChange("Item2")}
        />
        <ListItemText primary="Audios" />
      </ListItemButton>
      <ListItemButton>
        <Checkbox
          checked={checkedItems["Item3"]}
          onChange={() => handleCheckboxChange("Item3")}
        />
        <ListItemText primary="Videos" />
      </ListItemButton>
      <ListItemButton>
        <Checkbox
          checked={checkedItems["Item4"]}
          onChange={() => handleCheckboxChange("Item3")}
        />
        <ListItemText primary="Documents" />
      </ListItemButton>
    </List>
  );
};

export default MediaAutoDownloadsModalContent;

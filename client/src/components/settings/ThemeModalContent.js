import React, { useState } from "react";
import {
  ListItem,
  ListItemButton,
  List,
  ListItemText,
  Radio,
} from "@mui/material";

const ThemeModalContent = () => {
  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleThemeChange("light")}>
            <Radio
              checked={selectedTheme === "light"}
              color="primary"
              size="small"
            />
            <ListItemText
              primary="Light Mode"
              sx={{ color: "#000000" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleThemeChange("dark")}>
            <Radio
              checked={selectedTheme === "dark"}
              color="primary"
              size="small"
            />
            <ListItemText
              primary="Dark Mode"
              sx={{ color: "#000000" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleThemeChange("systemDefault")}>
            <Radio
              checked={selectedTheme === "systemDefault"}
              color="primary"
              size="small"
            />
            <ListItemText
              primary="System Default"
              sx={{ color: "#000000" }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default ThemeModalContent;

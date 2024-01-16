import { useState } from "react";
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const MoreVertMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton size="small" color="inherit" onClick={handleClick}>
        <MoreVertIcon fontSize="20px" />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ marginLeft: 2, marginRight: 2 }}>{children}</Box>
      </Popover>
    </>
  );
};

export default MoreVertMenu;

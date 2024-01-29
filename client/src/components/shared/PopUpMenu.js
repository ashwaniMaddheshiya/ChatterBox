import { useState } from "react";
import { IconButton, Popover, Box } from "@mui/material";

const PopUpMenu = ({ children, icon }) => {
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
        {icon}
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

export default PopUpMenu;

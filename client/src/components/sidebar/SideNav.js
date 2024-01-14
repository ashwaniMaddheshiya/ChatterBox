import { AppBar, Toolbar, Avatar, Stack } from "@mui/material/AppBar";

import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

const SideNav = () => {
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ bgcolor: "#414143", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton size="large" edge="start" color="inherit" aria-label="logo">
          <Avatar alt="User Image" src="/path/to/user-image.jpg" />
        </IconButton>

        <Stack spacing={1} direction="row">
          <IconButton size="small" color="inherit">
            <MessageIcon fontSize="20px" />
          </IconButton>
          <IconButton size="small" color="inherit">
            <MoreVertIcon fontSize="20px" />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default SideNav;

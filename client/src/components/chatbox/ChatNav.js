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
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const ChatNav = () => {
  const { selectUser } = useContext(UserContext);
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
          <IconButton color="inherit">
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default ChatNav;

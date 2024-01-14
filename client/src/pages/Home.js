import React from "react";
import { Box, Grid } from "@mui/material";

import SideBar from "../components/sidebar/SideBar";
import ChatBox from "../components/chatbox/ChatBox";

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Box height="100vh">
          <SideBar />
        </Box>
      </Grid>

      <Grid item xs={8}>
        <Box height="100vh" sx={{ borderLeft: "1px solid gray" }}>
          <ChatBox />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;

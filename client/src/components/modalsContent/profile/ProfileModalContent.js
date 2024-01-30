import React, { useContext } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import UserContext from "../../../context/UserContext";

const ProfileModalContent = () => {
  const { selectUser } = useContext(UserContext);
  return (
    <Box textAlign="center">
      <Avatar
        alt="User Image"
        src={selectUser.profile}
        sx={{ width: 80, height: 80, margin: "auto" }}
      />
      <Typography variant="h6" mt={2}>
        {selectUser.name}
      </Typography>
      <Typography variant="body1" color="white">
        Email: {selectUser.email}
      </Typography>
      <Typography variant="body2" color="white">
        About: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </Typography>
    </Box>
  );
};

export default ProfileModalContent;

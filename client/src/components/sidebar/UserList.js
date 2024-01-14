import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

import UserCard from "./UserCard";
import AuthContext from "../../context/AuthContext";

const UserList = ({ filteredUsers }) => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/user/all", {
        headers: {
          Authorization: token,
        },
      });
      console.log("UserData", response);
      setUsers(response.data);
    };
    fetchUsers();
  }, [token]);


  return (
    <>
      <Box>
        {filteredUsers ? (
          filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserCard userData={user} key={user._id} />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                No Result
              </Typography>
            </Box>
          )
        ) : (
          users.map((user) => <UserCard userData={user} key={user._id} />)
        )}
      </Box>
    </>
  );
};

export default UserList;

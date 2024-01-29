import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Box, Typography } from "@mui/material";

import UserCard from "./UserCard";
import AuthContext from "../../context/AuthContext";
import UserContext from "../../context/UserContext";

const UserList = ({ filteredUsers }) => {
  const [users, setUsers] = useState([]);
  const { token, user } = useContext(AuthContext);
  const { selectUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      let response;
      try {
        response = await axios.get(`/api/user/${user.userId}`, {
          headers: {
            Authorization: token,
          },
        });
        setUsers(response.data);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    fetchUsers();
  }, [token, user, selectUser]);

  return (
    <Box
      sx={{
        maxHeight: "82vh",
        overflowY: "auto",
      }}
    >
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
  );
};

export default UserList;

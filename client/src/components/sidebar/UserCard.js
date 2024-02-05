import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Card, CardHeader, Avatar, Chip } from "@mui/material";

import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";

const UserCard = ({ userData, onClick }) => {
  const { setSelectUser, setChatInfo, selectUser, notification } =
    useContext(UserContext);
  const { token } = useContext(AuthContext);

  const chatAccess = async () => {
    if (notification[userData._id]) {
      delete notification[userData._id];
    }
    let response;
    try {
      setSelectUser(userData);
      response = await axios.post(
        "/api/chat",
        { userId: userData._id },
        { headers: { Authorization: token } }
      );
      setChatInfo(response.data);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };
  const hasNotification = notification && notification[userData._id];
  return (
    <Card
      sx={{
        boxShadow: "none",
        borderBottom: "1px solid gray",
        cursor: "pointer",
        bgcolor:
          selectUser && selectUser._id === userData._id ? "#5d5d5d" : "#111b21",
        color: "#ffffff",
      }}
      onClick={chatAccess}
    >
      <CardHeader
        avatar={<Avatar alt="User Image" src={userData.profile} />}
        action={
          hasNotification ? (
            <Chip
              label={notification[userData._id]} // Set label based on notification count
              size="small"
              variant="contained"
              color="primary"
              sx={{marginTop:"10px"}}
            />
          ) : null
        }
        title={userData.name}
        subheader=""
      />
    </Card>
  );
};

export default UserCard;

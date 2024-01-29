import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Card, CardHeader, Avatar } from "@mui/material";

import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";

const UserCard = ({ userData, onClick }) => {
  const { setSelectUser, setChatInfo } = useContext(UserContext);
  const { token } = useContext(AuthContext);

  const chatAccess = async () => {
    let response;
    try {
      response = await axios.post(
        "/api/chat",
        { userId: userData._id },
        { headers: { Authorization: token } }
      );
      setSelectUser(userData);
      setChatInfo(response.data);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderBottom: "1px solid gray",
        cursor: "pointer",
        bgcolor: "#111b21",
        color: "#ffffff",
      }}
      onClick={chatAccess}
    >
      <CardHeader
        avatar={<Avatar alt="User Image" src="/path/to/user-image.jpg" />}
        title={userData.name}
        subheader=""
      />
    </Card>
  );
};

export default UserCard;

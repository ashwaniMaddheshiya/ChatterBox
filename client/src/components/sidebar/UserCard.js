import { useContext } from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

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
      // console.log("Response", response);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Card
      sx={{
        boxShadow: "none",
        borderBottom: "1px solid gray",
        cursor: "pointer",
      }}
      onClick={chatAccess}
    >
      <CardHeader
        avatar={<Avatar alt="User Image" src="/path/to/user-image.jpg" />}
        title={userData.name}
        subheader="Recent Message"
      />
    </Card>
  );
};

export default UserCard;

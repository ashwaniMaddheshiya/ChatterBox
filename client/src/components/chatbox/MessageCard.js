import Box from "@mui/material/Box";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const MessageCard = ({ message }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && (
        <Box
          sx={{
            backgroundColor:
              message.sender._id === user.userId ? "#257528" : "#414141",
            color: "white",
            padding: "8px",
            borderRadius: "8px",
            marginBottom: "8px",
            width: "fit-content",
            maxWidth: "70%",
            alignSelf:
              message.sender._id === user.userId ? "flex-end" : "flex-start",
          }}
        >
          {message.content}
        </Box>
      )}
    </>
  );
};

export default MessageCard;
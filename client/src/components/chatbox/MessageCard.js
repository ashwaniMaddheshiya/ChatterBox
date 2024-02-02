import { useContext } from "react";
import Box from "@mui/material/Box";
import AuthContext from "../../context/AuthContext";
import FileUi from "./FileUi";

const MessageCard = ({ message }) => {
  const { user } = useContext(AuthContext);
  const bgColor = message.sender._id === user.userId ? "#257528" : "#414141";

  return (
    <>
      {user && (
        <>
          {message.messageType === "file" ? (
            <FileUi fileUrl={message.content} bgColor={bgColor} />
          ) : (
            <Box
              sx={{
                backgroundColor: bgColor,
                color: "white",
                padding: "8px",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
            >
              {message.content}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default MessageCard;

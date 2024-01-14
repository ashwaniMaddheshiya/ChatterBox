import { useContext } from "react";
import Box from "@mui/material/Box";

import ChatNav from "./ChatNav";
import ChatHome from "./ChatHome";
import ChatBody from "./ChatBody";
import UserContext from "../../context/UserContext";

const ChatBox = () => {
  const { selectUser } = useContext(UserContext);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box>{selectUser && <ChatNav />}</Box>
      <Box
        sx={{
          flexGrow: "1",
          backgroundImage: `url('/wtsp-bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        {selectUser ? <ChatBody /> : <ChatHome />}
      </Box>
    </Box>
  );
};
export default ChatBox;

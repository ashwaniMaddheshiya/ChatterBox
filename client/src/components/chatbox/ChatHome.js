import { Box, Typography } from "@mui/material";

const ChatHome = () => {
  return (
    <Box
      sx={{
        color: "white",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Typography variant="h3">Whatsapp</Typography>
        <Typography variant="body1">
          Select or Search an user to start a conversation!
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatHome;

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
        <Typography variant="h3">ChatterBox</Typography>
        <Typography variant="body1">
          Select or Search an user to start a conversation!
        </Typography>
        <Typography variant="body2" mt={2} fontWeight={700}>
          Didn't find any user? Search "Admin" in New Chat (icon next to your
          profile)
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatHome;

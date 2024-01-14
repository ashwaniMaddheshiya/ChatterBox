import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ChatHome = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url('/wtsp-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <Typography variant="h3">WhatsApp</Typography>
    </Box>
  );
};

export default ChatHome;

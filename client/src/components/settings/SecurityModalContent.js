import { Box, Typography } from "@mui/material";

const SecurityModalContent = () => {
  return (
    <Box>
      <Box sx={{ borderBottom: "1px solid #e0e0e0", paddingBottom: 2 }}>
        <Typography variant="h6" sx={{ color: "#075e54" }}>
          Your Chats and Calls are private
        </Typography>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body2" sx={{ color: "#757575", marginBottom: 2 }}>
          End-to-End encryption keeps your personal messages and calls between
          you and the people you choose. Not even WhatsApp can read or listen to
          them. This includes your:
        </Typography>
        <Typography sx={{ color: "#757575" }}>
          <ul>
            <li>Text and Voice Messages</li>
            <li>Audio and Video Calls</li>
            <li>Photos, Videos, and Documents</li>
            <li>Location Sharing</li>
            <li>Status Updates</li>
          </ul>
        </Typography>
      </Box>
    </Box>
  );
};

export default SecurityModalContent;

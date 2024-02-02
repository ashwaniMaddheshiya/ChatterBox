import { Box, Button, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const SendFileUi = ({ fileName, sendFile }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box sx={{ fontSize: "128px", color: "white", marginBottom: "32px" }}>
        <PictureAsPdfIcon fontSize="inherit" />
        <Box sx={{ marginTop: "-20px" }}>
          <Typography sx={{ textAlign: "center" }}>{fileName}</Typography>
        </Box>
      </Box>

      <Button variant="contained" color="success" sx={{ width: "50%" }} onClick={sendFile}>
        Send
      </Button>
    </Box>
  );
};

export default SendFileUi;

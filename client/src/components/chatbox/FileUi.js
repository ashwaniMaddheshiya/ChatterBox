import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const FileUi = ({ fileUrl, bgColor }) => {
  const handleDownloadFile = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = fileUrl.split("/").pop();
    link.click();
  };

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        backgroundColor: bgColor,
        borderRadius: "8px",
        marginBottom: "8px",
        cursor: "pointer",
      }}
      elevation={0}
      onClick={handleDownloadFile}
    >
      <Box mr={2} style={{ color: "white" }}>
        <PictureAsPdfIcon />
      </Box>
      <Box>
        <Typography variant="body1" sx={{ color: "white" }}>
          PDF File
        </Typography>
      </Box>
    </Paper>
  );
};

export default FileUi;

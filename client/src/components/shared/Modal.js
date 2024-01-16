import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Modal = ({ open, onClose, title, children }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" gap={2}>
          <IconButton onClick={onClose} size="small">
            <ArrowBackIcon />
          </IconButton>
          {title}
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ marginLeft: 2, marginRight: 2 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

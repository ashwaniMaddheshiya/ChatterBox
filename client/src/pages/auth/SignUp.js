import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function SignUp() {
  const navigate = useNavigate();
  const { token } = React.useContext(AuthContext);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfilePic(selectedFile);
  };

  const uploadPic = async () => {
    if (profilePic == null) return null;
    const profileRef = ref(storage, `profile/${profilePic.name + v4()}`);
    await uploadBytes(profileRef, profilePic);

    const profileUrl = await getDownloadURL(profileRef);
    return profileUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    if (!name || !email || !password) {
      toast.error("All Fields are required!");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters with at least one lowercase letter, one uppercase letter, one number, and one special character."
      );
      return;
    }

    const profileUrl = await uploadPic();
    let response;
    try {
      response = await axios.post(`/api/user/signup`, {
        name,
        email,
        password,
        profileUrl,
      });
    } catch (err) {
      toast.error(err.response.data.error);
    }

    if (response) {
      navigate("/signin");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="profile-pic"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label
                htmlFor="profile-pic"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Profile Picture"
                  src={profilePic ? URL.createObjectURL(profilePic) : ""}
                  sx={{ width: 100, height: 100, cursor: "pointer" }}
                />
                <Typography variant="body2" mt={2} fontWeight={600}>
                  Upload Profile Pic
                </Typography>
              </label>
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Typography variant="body2">
                Already have an account?
                <Link to="/signin"> Sign In</Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AuthContext from "../../../context/AuthContext";
import UserCard from "../../sidebar/UserCard";

const NewChatModalContent = ({ onClose }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const { token, user } = useContext(AuthContext);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchText]);

  useEffect(() => {
    if (debouncedSearchText.trim() !== "") {
      const SearchUser = async () => {
        let response;
        try {
          response = await axios.post(
            `/api/user/search`,
            {
              searchText: debouncedSearchText,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setSearchResults(response.data);
        } catch (err) {
          toast.error(err.response.data.error);
        }
      };
      SearchUser();
    } else {
      setSearchResults();
    }
  }, [debouncedSearchText, token, user.userId]);

  return (
    <>
      <Box
        sx={{
          marginTop: "8px",
          marginBottom: "8px",
          width: "90%",
          marginLeft: "4px",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            style: {
              color: "#ffffff",
              borderColor: "#ffffff",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff", 
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#ffffff", 
              },
          }}
        />
      </Box>
      <Box>
        {searchResults &&
          searchResults.map((user) => (
            <UserCard userData={user} key={user._id} />
          ))}
      </Box>
    </>
  );
};

export default NewChatModalContent;

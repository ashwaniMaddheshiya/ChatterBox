import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import UserList from "./UserList";
import AuthContext from "../../context/AuthContext";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState();
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
        try {
          const response = await axios.post(
            `/api/user/search/${user.userId}`,
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
  }, [debouncedSearchText, user.userId, token]);

  return (
    <>
      <Box
        sx={{
          marginTop: "8px",
          marginBottom: "8px",
          width: "90%",
          marginLeft: "4px",
          bgcolor: "#202c33",
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
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            style: { color: "white" },
          }}
        />
      </Box>
      <Box>
        <UserList filteredUsers={searchResults} />
      </Box>
    </>
  );
};

export default SearchBar;

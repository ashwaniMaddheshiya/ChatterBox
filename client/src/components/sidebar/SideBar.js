import Box from "@mui/material/Box";
import SideNav from "./SideNav";
import SearchBar from "./SearchBar";

const SideBar = () => {
  return (
    <Box>
      <Box>
        <SideNav />
      </Box>
      <Box>
        <SearchBar />
      </Box>
    </Box>
  );
};

export default SideBar;

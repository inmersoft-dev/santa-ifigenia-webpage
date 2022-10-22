// @mui/material
import { Box } from "@mui/material";

// sections
import Hero from "./Sections/Hero/Hero";
import AreaTab from "./Sections/AreaTab/AreaTab";

const Home = () => {
  return (
    <Box sx={{ minWidth: "100%", minHeight: "100vh" }}>
      <Hero />
      <AreaTab />
    </Box>
  );
};

export default Home;

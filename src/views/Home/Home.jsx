// @mui/material
import { Box } from "@mui/material";

// own components
import Navbar from "../../components/Navbar/Navbar";

// sections
import Hero from "./Sections/Hero/Hero";
import News from "./Sections/News/News";
import Graves from "./Sections/Graves/Graves";
import Routes from "./Sections/Routes/Routes";
import Events from "./Sections/Events/Events";

const Home = () => {
  return (
    <Box sx={{ minWidth: "100%", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Graves />
      <Routes />
      <News />
      <Events />
    </Box>
  );
};

export default Home;

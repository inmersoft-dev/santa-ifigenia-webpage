// @mui/material
import { Box } from "@mui/material";

// images
import heroBgSM from "../../../../assets/images/hero-bg-sm.jpg";
import heroBgMD from "../../../../assets/images/hero-bg-md.jpg";
import heroBgLG from "../../../../assets/images/hero-bg-lg.jpg";
import heroBgXL from "../../../../assets/images/hero-bg-xl.jpg";

const Routes = () => {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        minWidth: "100%",
        /* backgroundImage: {
          xs: `url(${heroBgSM})`,
          md: `url(${heroBgMD})`,
          lg: `url(${heroBgLG})`,
          xl: `url(${heroBgXL})`,
        },
        backgroundSize: "cover",
        backgroundPosition: "center", */
      }}
    ></Box>
  );
};

export default Routes;

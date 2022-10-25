import { useState, useEffect } from "react";

// @mui/material
import { useTheme, Box } from "@mui/material";

// context
import { useLanguage } from "../../../../context/LanguageProvider";

// images
import heroBgXl from "../../../../assets/images/hero-bg-xl.jpg";

// local components
import First from "./Sections/First";
import Second from "./Sections/Second";

const Hero = () => {
  const theme = useTheme();
  const { languageState } = useLanguage();

  const [hero, setHero] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (hero < languageState.texts.Home.Hero.length - 1) setHero(hero + 1);
      else setHero(0);
    }, 5000);
  }, [hero]);

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        padding: {
          md: "0px 5rem",
          sm: "0px 40px",
          xs: "0px 20px",
        },
        position: "relative",
        background: { lg: `url(${heroBgXl})`, xs: theme.palette.primary.main },
        backgroundPosition: "center !important",
        backgroundSize: "cover !important",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: `${theme.palette.primary.main}8c`,
          top: 0,
          left: 0,
          position: "absolute",
        }}
      />
      {hero === 0 && <First />}
      {hero === 1 && <Second />}
    </Box>
  );
};

export default Hero;

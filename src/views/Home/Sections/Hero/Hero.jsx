// @mui/material
import { useTheme, Box, Typography } from "@mui/material";

// context
import { useLanguage } from "../../../../context/LanguageProvider";

// own components
import InViewComponent from "../../../../components/InViewComponent/InViewComponent";

// images
import heroBgXl from "../../../../assets/images/hero-bg-xl.jpg";

const Hero = () => {
  const theme = useTheme();
  const { languageState } = useLanguage();

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
      {
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
      }
      <Box
        sx={{
          display: "flex",
          zIndex: 1,
          flexDirection: "column",
          justifyContent: "center",
          width: { lg: "60%", md: "75%", sm: "80%", xs: "100%" },
          height: "100%",
        }}
      >
        <InViewComponent delay="0.1s">
          <Typography variant="subtitle1" sx={{ color: "aliceblue" }}>
            {languageState.texts.Home.Hero.Subtitle}
          </Typography>
        </InViewComponent>
        <InViewComponent delay="0.2s">
          <Typography
            variant="h1"
            sx={{ marginBottom: "40px", color: "aliceblue" }}
          >
            {languageState.texts.Home.Hero.Title}
          </Typography>
        </InViewComponent>
        <InViewComponent delay="0.3s">
          <Typography
            variant="body1"
            sx={{
              color: "aliceblue",
              width: { lg: "70%", md: "75%", sm: "80%", xs: "100%" },
            }}
          >
            {languageState.texts.Home.Hero.Body}
          </Typography>
        </InViewComponent>
      </Box>
    </Box>
  );
};

export default Hero;

// @mui/material
import { useTheme, Box, Typography } from "@mui/material";

// context
import { useLanguage } from "../../../../context/LanguageProvider";

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
        background: theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: theme.palette.secondary.light }}
        >
          {languageState.texts.Home.Hero.Subtitle}
        </Typography>
        <Typography
          variant="h1"
          sx={{ marginBottom: "40px", color: theme.palette.secondary.light }}
        >
          {languageState.texts.Home.Hero.Title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.secondary.light }}
        >
          {languageState.texts.Home.Hero.Body}
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;

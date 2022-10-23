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
        minHeight: "60vh",
        minWidth: "100%",
        display: "flex",
        alignItems: "center",
        padding: {
          md: "0px 5rem",
          sm: "0px 40px",
          xs: "0px 20px",
        },
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
          variant="h3"
          sx={{ marginBottom: "20px", color: theme.palette.primary.main }}
        >
          {languageState.texts.Discover.Hero.Graves.Title}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
          {languageState.texts.Discover.Hero.Graves.Body}
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;

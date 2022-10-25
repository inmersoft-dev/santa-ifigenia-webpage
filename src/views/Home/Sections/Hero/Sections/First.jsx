// @mui/material
import { Box, Typography } from "@mui/material";

// own components
import InViewComponent from "../../../../../components/InViewComponent/InViewComponent";

// context
import { useLanguage } from "../../../../../context/LanguageProvider";

const First = () => {
  const { languageState } = useLanguage();

  return (
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
          {languageState.texts.Home.Hero[0].Subtitle}
        </Typography>
      </InViewComponent>
      <InViewComponent delay="0.2s">
        <Typography
          variant="h1"
          sx={{ marginBottom: "20px", color: "aliceblue" }}
        >
          {languageState.texts.Home.Hero[0].Title}
        </Typography>
      </InViewComponent>
      {languageState.texts.Home.Hero[0].Body && (
        <InViewComponent delay="0.3s">
          <Typography
            variant="body1"
            sx={{
              color: "aliceblue",
              width: { lg: "70%", md: "75%", sm: "80%", xs: "100%" },
            }}
          >
            {languageState.texts.Home.Hero[0].Body}
          </Typography>
        </InViewComponent>
      )}
    </Box>
  );
};

export default First;

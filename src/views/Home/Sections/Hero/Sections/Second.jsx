import { Link } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// @mui/material
import { Box, Button, Typography } from "@mui/material";

// own components
import InViewComponent from "../../../../../components/InViewComponent/InViewComponent";

// context
import { useLanguage } from "../../../../../context/LanguageProvider";

const Second = () => {
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
          {languageState.texts.Home.Hero[1].Subtitle}
        </Typography>
      </InViewComponent>
      <InViewComponent delay="0.2s">
        <Typography
          variant="h1"
          sx={{ marginBottom: "20px", color: "aliceblue" }}
        >
          {languageState.texts.Home.Hero[1].Title}
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
          {languageState.texts.Home.Hero[1].Body}
        </Typography>
      </InViewComponent>
      <InViewComponent delay="0.4s">
        <Link
          to={languageState.texts.Home.Hero[1].Link}
          className={css({ textDecoration: "none" })}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: "10px" }}
          >
            {languageState.texts.Home.Hero[1].SeeMore}
          </Button>
        </Link>
      </InViewComponent>
    </Box>
  );
};

export default Second;

import { Link } from "react-router-dom";

// sito components
import SitoContainer from "sito-container";

// @mui/material
import { Typography, Box } from "@mui/material";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

const NotFound = () => {
  const { languageState } = useLanguage();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: { lg: "0 300px", md: "0 100px", sm: "0 40px", xs: "0 25px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <SitoContainer flexDirection="column">
        <Typography variant="h3">
          {languageState.texts.General.Company}
        </Typography>
        <SitoContainer sx={{ marginTop: "30px" }}>
          <Typography sx={{ fontWeight: "bold", marginRight: "5px" }}>
            {languageState.texts.NotFound.Title.Bold}
          </Typography>
          {languageState.texts.NotFound.Title.Regular}
        </SitoContainer>
        <Typography sx={{ marginTop: "30px" }}>
          {languageState.texts.NotFound.Body}{" "}
          <Link to="/">{languageState.texts.NotFound.Button}</Link>
        </Typography>
      </SitoContainer>
      <Box
        sx={{
          border: "2px solid blue",
          width: "300px",
          height: " 300px",
          display: { md: "flex", xs: "none" },
        }}
      ></Box>
    </Box>
  );
};

export default NotFound;

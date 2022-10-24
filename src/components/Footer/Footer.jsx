// @mui/material
import { useTheme, Box, Link, Typography } from "@mui/material";

// @mui/icons-material
import LaunchIcon from "@mui/icons-material/Launch";

// context
import { useLanguage } from "../../context/LanguageProvider";

const Footer = () => {
  const theme = useTheme();

  const { languageState } = useLanguage();

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "54px",
        backgroundColor: theme.palette.primary.light,
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
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{ color: theme.palette.secondary.light, display: "flex" }}
        >
          {languageState.texts.Footer.Develop}{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://inmseroft.net"
            sx={{
              display: "flex",
              marginLeft: "5px",
              alignItems: "center",
              color: theme.palette.secondary.light,
            }}
          >
            {languageState.texts.General.Creator}
            <LaunchIcon sx={{ fontSize: "18px", marginLeft: "5px" }} />
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

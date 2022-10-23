import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// @emotion/css
import { css } from "@emotion/css";

// @mui/material;
import { useTheme, Box, Button, IconButton, Typography } from "@mui/material";

// react-cool-onclickoutside
import useOnclickOutside from "react-cool-onclickoutside";

// @mui/icons-material
import { Cancel } from "@mui/icons-material";

// context
import { useLanguage } from "../../context/LanguageProvider";

const Drawer = (props) => {
  const theme = useTheme();

  const { visible, handleClose } = props;

  const { languageState } = useLanguage();

  const ref = useOnclickOutside(() => {
    handleClose();
  });

  return (
    <Box
      sx={{
        minWidth: "100%",
        minHeight: "100vh",
        position: "fixed",
        transition: "all 500ms ease",
        zIndex: visible ? 999999 : -1,
        backgroundColor: visible ? `${theme.palette.primary.main}9c` : "",
      }}
    >
      <Box
        ref={ref}
        sx={{
          top: 0,
          left: 0,
          width: "305px",
          zIndex: 9999999,
          position: "fixed",
          minHeight: "100vh",
          padding: "90px 20px",
          transition: "all 500ms ease",
          backgroundColor: theme.palette.primary.main,
          transform: visible ? "translateX(0px)" : "translateX(-305px)",
        }}
      >
        <IconButton
          color="inherit"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "aliceblue",
          }}
        >
          <Cancel />
        </IconButton>
        <Link
          className={css({ textDecoration: "none", color: "inherit" })}
          to="/"
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "aliceblue",
            }}
          >
            {languageState.texts.General.Company}
          </Typography>
        </Link>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginTop: "40px" }}
        >
          {languageState.texts.Navbar.DrawerLinks.map((item) => (
            <Link
              className={css({
                textDecoration: "none",
              })}
              key={item.Label}
              to={item.Link}
            >
              <Button
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "aliceblue",
                }}
              >
                {item.Label}
              </Button>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

Drawer.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Drawer;

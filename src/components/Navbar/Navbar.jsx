import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

// @mui/material
import {
  useTheme,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material/";

// @mui/icons-material
import MenuIcon from "@mui/icons-material/Menu";

// context
import { useLanguage } from "../../context/LanguageProvider";

// @emotion/css
import { css } from "@emotion/css";

const Navbar = () => {
  const { languageState } = useLanguage();

  const theme = useTheme();

  const [scroll, setScroll] = useState(false);

  const onScroll = useCallback(() => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    if (top > 65) setScroll(true);
    else setScroll(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
          transition: "background-color 500ms ease",
          backgroundColor: !scroll ? "white" : theme.palette.primary.main,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              mr: 2,
              color: !scroll ? theme.palette.primary.main : "aliceblue",
            }}
          >
            <MenuIcon />
            <MenuIcon sx={{ marginLeft: "-6px" }} />
          </IconButton>
          <Link
            className={css({ textDecoration: "none", color: "inherit" })}
            to="/"
          >
            <Typography
              variant="h6"
              sx={{
                color: !scroll ? theme.palette.primary.main : "inherit",
              }}
            >
              {languageState.texts.General.Company}
            </Typography>
          </Link>
          <Box sx={{ display: { md: "inherit", xs: "none" } }}>
            {languageState.texts.Navbar.Links.map((item) => (
              <Link
                className={css({
                  textDecoration: "none",
                  color: !scroll ? theme.palette.primary.main : "aliceblue",
                })}
                key={item.Label}
                to={item.Link}
              >
                <Button
                  sx={{
                    fontWeight: "bold",
                    color: !scroll ? theme.palette.primary.main : "aliceblue",
                  }}
                >
                  {item.Label}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
    </Box>
  );
};

export default Navbar;

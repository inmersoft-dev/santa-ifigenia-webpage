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

// own components
import Drawer from "../Drawer/Drawer";

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

  const [showDrawer, setShowDrawer] = useState(false);
  const closeDrawer = () => setShowDrawer(false);

  return (
    <Box sx={{ flexGrow: 1, height: "75px !important" }}>
      <Drawer visible={showDrawer} handleClose={closeDrawer} />
      <AppBar
        position="fixed"
        sx={{
          height: "75px !important",
          boxShadow: "none",
          transition: "background-color 500ms ease",
          backgroundColor: scroll ? "white" : theme.palette.primary.main,
        }}
      >
        <Toolbar
          sx={{ justifyContent: "space-between", height: "75px !important" }}
        >
          <Box display="flex" alignItems="center">
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              onClick={() => setShowDrawer(true)}
              sx={{
                mr: 2,
                minHeight: "64px",
                color: scroll ? theme.palette.primary.main : "aliceblue",
              }}
            >
              <MenuIcon />
              <MenuIcon sx={{ marginLeft: "-6px" }} />
            </IconButton>

            <Box
              sx={{
                opacity: { md: 1, xs: 0 },
                width: { xs: "40px", md: "inherit" },
              }}
            >
              {languageState.texts.Navbar.Left.map((item, index) => (
                <Link
                  className={css({
                    textDecoration: "none",
                    color: scroll ? theme.palette.primary.main : "aliceblue",
                  })}
                  key={item.Label}
                  to={item.Link}
                >
                  <Button
                    size="large"
                    sx={{
                      display:
                        index > 0 ? { md: "inherit", xs: "none" } : "inherit",
                      fontWeight: "bold",
                      color: scroll ? theme.palette.primary.main : "aliceblue",
                    }}
                  >
                    {item.Label}
                  </Button>
                </Link>
              ))}
            </Box>
          </Box>
          <Link
            className={css({ textDecoration: "none", color: "inherit" })}
            to="/"
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: scroll ? theme.palette.primary.main : "inherit",
              }}
            >
              {languageState.texts.General.Company}
            </Typography>
          </Link>
          <Box sx={{ opacity: { md: 1, xs: 0 } }}>
            {languageState.texts.Navbar.Links.map((item, index) => (
              <Link
                className={css({
                  textDecoration: "none",
                  color: scroll ? theme.palette.primary.main : "aliceblue",
                })}
                key={item.Label}
                to={item.Link}
              >
                <Button
                  size="large"
                  sx={{
                    display:
                      index > 0 ? { md: "inherit", xs: "none" } : "inherit",
                    fontWeight: "bold",
                    color: scroll ? theme.palette.primary.main : "aliceblue",
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

import { useState, useEffect, useCallback } from "react";

// @mui/material
import { useTheme, Tooltip, IconButton } from "@mui/material";

// @mui/icons-material
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

// context
import { useLanguage } from "../../context/LanguageProvider";

// utils
import { scrollTo } from "../../utils/function";

const ToTop = () => {
  const theme = useTheme();
  const { languageState } = useLanguage();

  const [scroll, setScroll] = useState(false);

  const onScroll = useCallback(() => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    if (top > 600) setScroll(true);
    else setScroll(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    scroll && (
      <Tooltip title={languageState.texts.Tooltips.ToTop}>
        <IconButton
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 999,
          }}
          onClick={scrollTo}
        >
          <ArrowDropDownCircleIcon
            color="info"
            sx={{
              transform: "rotate(180deg)",
              fontSize: "2rem",
            }}
          />
        </IconButton>
      </Tooltip>
    )
  );
};

export default ToTop;

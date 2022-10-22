/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/function-component-definition */

// prop-types
import PropTypes from "prop-types";

// @mui components
import { Box, useTheme, CircularProgress } from "@mui/material";

// @mui/icons-material
import LoopIcon from "@mui/icons-material/Loop";

const Loading = (props) => {
  const theme = useTheme();
  const { sx, visible, fontSize, background } = props;

  return (
    <Box
      sx={{
        opacity: visible ? 1 : 0,
        zIndex: visible ? 99 : -1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 400ms ease",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backdropFilter: "blur(4px)",
        background: background || `${theme.palette.background.paper}`,
        borderRadius: "1rem",
        ...sx,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

Loading.defaultProps = {
  sx: {},
  visible: false,
  fontSize: "3rem",
  background: undefined,
};

Loading.propTypes = {
  sx: PropTypes.objectOf(PropTypes.any),
  visible: PropTypes.bool,
  fontSize: PropTypes.string,
  background: PropTypes.string,
};

export default Loading;

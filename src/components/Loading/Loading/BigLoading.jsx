/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-undef */
// prop-types
import PropTypes from "prop-types";

// mui components
import { Box } from "@mui/material";

// images
// import lightLogo from "assets/images/optlogo.webp";
// import darkLogo from "../../assets/images/darlogo.webp";

import "./style.css";

const BigLoading = (props) => {
  const { visible } = props;

  return (
    <Box
      id="contenedor_carga"
      style={{
        backgroundColor: "#E3F2FD",
        opacity: visible ? 1 : 0,
        zIndex: visible ? 99 : -1,
      }}
    >
      <Box className="progress_bar">
        <Box className="bar_h" />
      </Box>
    </Box>
  );
};

BigLoading.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default BigLoading;

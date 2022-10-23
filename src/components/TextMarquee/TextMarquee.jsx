import PropTypes from "prop-types";

// @mui/material
import { Box } from "@mui/material";

// style
import "./style.css";

const TextMarquee = (props) => {
  const { children, sx } = props;
  return (
    <Box className="marquee" sx={{ ...sx }}>
      {children}
    </Box>
  );
};

TextMarquee.defaultProps = {
  variant: "h2",
  sx: {},
};

TextMarquee.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default TextMarquee;

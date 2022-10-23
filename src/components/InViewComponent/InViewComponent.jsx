import { useRef } from "react";

import PropTypes from "prop-types";

// framer-motion
import { useInView } from "framer-motion";

// @mui/material
import { Box } from "@mui/material";

const InViewComponent = (props) => {
  const { children, delay, sx } = props;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        transform: isInView ? "translateY(0px)" : "translateY(20px)",
        opacity: isInView ? 1 : 0,
        transition: `all 0.1s linear ${delay}`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

InViewComponent.defaultProps = {
  children: <></>,
  delay: "0.3s",
  sx: {},
};

InViewComponent.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.string,
  sx: PropTypes.object,
};

export default InViewComponent;

import { useState, useRef } from "react";

// framer-motion
import { useInView } from "framer-motion";

import PropTypes from "prop-types";

// @mui/material
import { Box, Typography } from "@mui/material";

// context
import { useLanguage } from "../../context/LanguageProvider";

// images
import defaultTomb from "../../assets/images/default-tomb.jpg";

const Card = (props) => {
  const { image, title, subtitle, id, delay } = props;

  const { languageState } = useLanguage();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [showContent, setShowContent] = useState(false);

  return (
    <Box
      ref={ref}
      onMouseEnter={() => setShowContent(true)}
      onMouseLeave={() => setShowContent(false)}
      component="a"
      href={`/details?id=${id}`}
      sx={{
        height: "300px",
        display: "flex",
        cursor: "pointer",
        position: "relative",
        padding: "20px 40px",
        textDecoration: "none",
        flexDirection: "column",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        flex: { md: 1, xs: "inherit" },
        backgroundImage: `url(${image})`,
        minWidth: { md: "450px", xs: "340px" },
        opacity: isInView ? 1 : 0,
        transition: `all 0.1s linear ${delay}`,
        transform: isInView ? "translateY(0px)" : "translateY(20px)",
      }}
    >
      <Box
        sx={{
          top: 0,
          left: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          position: "absolute",
          background: "#222222c2",
          opacity: showContent ? 1 : 0,
          transition: "opacity 500ms ease",
        }}
      />
      <Box
        sx={{
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          opacity: showContent ? 1 : 0,
          justifyContent: "space-between",
          transition: "opacity 500ms ease",
        }}
      >
        <Box>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ zIndex: 2, color: "aliceblue" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ zIndex: 2, color: "aliceblue", marginBottom: "10px" }}
          >
            {subtitle.substring(0, 100)}
            {subtitle.length > 100 ? "..." : ""}
          </Typography>
        </Box>
        <Typography
          sx={{ zIndex: 2, color: "aliceblue", textDecoration: "underline" }}
        >
          {languageState.texts.Card.SeeMore}
        </Typography>
      </Box>
    </Box>
  );
};

Card.defaultProps = {
  id: 1,
  delay: "0.3s",
  image: defaultTomb,
  title: "Tomb 1",
  subtitle:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex esse nesciunt impedit veniam! Unde delectus maiores reprehenderit autem iusto amet natus molestiae aspernatur rerum praesentium veniam, modi dolore porro quae!",
};

Card.propTypes = {
  id: PropTypes.number,
  delay: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Card;

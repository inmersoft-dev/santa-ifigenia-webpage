import { useRef } from "react";

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
  const { image, title, subtitle, id, delay, sx, subtitleLimit, titleLimit } =
    props;

  const { languageState } = useLanguage();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Box
      component="a"
      href={`/details?id=${id}`}
      sx={{
        textDecoration: "none",
        opacity: isInView ? 1 : 0,
        transition: `all 0.1s linear ${delay}`,
        transform: isInView ? "translateY(0px)" : "translateY(20px)",
        height: "300px",
        display: "flex",
        cursor: "pointer",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        backgroundSize: "100%",
        backgroundPosition: "center",
        flex: { md: 1, xs: "inherit" },
        minWidth: { md: "450px", xs: "340px" },
        ...sx,
      }}
    >
      <Box
        ref={ref}
        sx={{
          height: "300px",
          display: "flex",
          cursor: "pointer",
          position: "relative",
          padding: "20px 40px",
          flexDirection: "column",
          justifyContent: "center",
          backgroundSize: "100%",
          backgroundPosition: "center",
          flex: { md: 1, xs: "inherit" },
          minWidth: { md: "450px", xs: "340px" },
          backgroundImage: `url(${image === null ? defaultTomb : image})`,
          transition: "background-size 500ms ease",
          "&:hover": {
            backgroundSize: "110%",
          },
          ...sx,
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
          }}
        />
        <Box
          sx={{
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ zIndex: 2, color: "aliceblue" }}
            >
              {title.substring(0, titleLimit)}
              {title.length > titleLimit ? "..." : ""}
            </Typography>
            <Typography
              variant="body1"
              sx={{ zIndex: 2, color: "aliceblue", marginBottom: "10px" }}
            >
              {subtitle.substring(0, subtitleLimit)}
              {subtitle.length > subtitleLimit ? "..." : ""}
            </Typography>
          </Box>
          <Typography
            sx={{ zIndex: 2, color: "aliceblue", textDecoration: "underline" }}
          >
            {languageState.texts.Card.SeeMore}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

Card.defaultProps = {
  id: 1,
  titleLimit: 100,
  subtitleLimit: 100,
  delay: "0.3s",
  image: defaultTomb,
  title: "Tomb 1",
  subtitle:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex esse nesciunt impedit veniam! Unde delectus maiores reprehenderit autem iusto amet natus molestiae aspernatur rerum praesentium veniam, modi dolore porro quae!",
  sx: {},
};

Card.propTypes = {
  id: PropTypes.number,
  titleLimit: PropTypes.number,
  subtittleLimit: PropTypes.number,
  delay: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  sx: PropTypes.object,
};

export default Card;

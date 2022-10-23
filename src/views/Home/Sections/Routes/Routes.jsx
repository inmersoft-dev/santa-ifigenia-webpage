import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// @mui/material
import { useTheme, Box, Button, Typography } from "@mui/material";

// own components
import Empty from "../../../../components/Empty/Empty";
import Error from "../../../../components/Error/Error";
import Loading from "../../../../components/Loading/Loading";
import TextMarquee from "../../../../components/TextMarquee/TextMarquee";
import InViewComponent from "../../../../components/InViewComponent/InViewComponent";

// services
import { routeList } from "../../../../services/routes/get";

// context
import { useLanguage } from "../../../../context/LanguageProvider";
import { useNotification } from "../../../../context/NotificationProvider";

// images
import defaultTomb from "../../../../assets/images/default-tomb.jpg";

const Routes = () => {
  const theme = useTheme();

  const { languageState } = useLanguage();
  const { setNotificationState } = useNotification();

  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState([]);

  const showNotification = (ntype, message) =>
    setNotificationState({
      type: "set",
      ntype,
      message,
    });

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await routeList({ count: 4, page: 1, reduced: true });
      if (response.status === 200) {
        const { list } = response;
        setRoutes(list);
      } else showNotification("error", String(response.error));
    } catch (err) {
      showNotification("error", String(err));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "100%",
        minHeight: "100vh",
        padding: {
          md: "100px 5rem",
          sm: "100px 40px",
          xs: "100px 20px",
        },
        overflow: "hidden",
        alignItems: "center",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
        background: theme.palette.primary.main,
      }}
    >
      <TextMarquee>
        <Typography
          variant="h2"
          sx={{
            fontSize: "170px",
            marginBottom: "40px",
            textTransform: "uppercase",
            color: theme.palette.secondary.light,
            whiteSpace: "nowrap",
          }}
        >
          {languageState.texts.Sections.Routes.Title}
        </Typography>
      </TextMarquee>

      <Box
        display="flex"
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {routes !== -1 &&
          routes.map((item, i) => (
            <Box
              key={item.id}
              sx={{
                width: "100%",
                marginTop: { lg: "100px", md: "70px", xs: "40px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: {
                  md: i % 2 === 0 ? "row" : "row-reverse",
                  xs: "column",
                },
              }}
            >
              <InViewComponent
                delay={`0.${i * 1}s`}
                sx={{
                  width: { xl: "50%", lg: "400px", md: "350px", xs: "100%" },
                  height: { lg: "400px", xs: "300px" },
                  marginBottom: { md: 0, xs: "40px" },
                }}
              >
                <Box
                  component="a"
                  href={`/details?id=${item.id}`}
                  sx={{
                    width: {
                      xl: "100%",
                      lg: "400px",
                      md: "350px",
                      xs: "100%",
                    },
                    height: { lg: "400px", xs: "300px" },
                    marginRight: { md: i % 2 === 0 ? "40px" : 0, xs: 0 },
                    marginLeft: { md: i % 2 !== 0 ? "40px" : 0, xs: 0 },
                    backgroundImage: `url(${
                      item.headerImages[0] === null
                        ? defaultTomb
                        : item.headerImage[0]
                    })`,
                    backgroundSize: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    transition: "background-size 500ms ease",
                    "&:hover": {
                      backgroundSize: "110%",
                    },
                  }}
                />
              </InViewComponent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: {
                    md: i % 2 === 0 ? "flex-start" : "flex-end",
                    xs: "flex-start",
                  },
                  width: { lg: "700px", md: "500px", xs: "100%" },
                }}
              >
                <InViewComponent delay={`0.${i + 2}s`}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.secondary.light,
                      textAlign: {
                        md: i % 2 === 0 ? "left" : "right",
                        xs: "left",
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                </InViewComponent>
                <InViewComponent delay={`0.${i + 3}s`}>
                  <Typography
                    variant="body1"
                    sx={{
                      marginTop: "20px",
                      color: theme.palette.secondary.light,
                      textAlign: {
                        md: i % 2 === 0 ? "left" : "right",
                        xs: "left",
                      },
                    }}
                  >
                    {item.subtitle.substring(0, 150)}
                    {item.subtitle.length > 150 ? "..." : ""}
                  </Typography>
                </InViewComponent>
                <InViewComponent delay={`0.${i + 4}s`}>
                  <Link
                    to={`/details?id=${item.id}`}
                    className={css({ textDecoration: "none" })}
                  >
                    <Button
                      sx={{ marginTop: "20px" }}
                      variant="contained"
                      color="secondary"
                    >
                      {languageState.texts.Sections.Routes.Content.Button}
                    </Button>
                  </Link>
                </InViewComponent>
              </Box>
            </Box>
          ))}

        <Loading visible={loading} />
        {routes !== -1 && !routes.length && <Empty />}
        {routes === -1 && <Error onAction={fetch} />}
      </Box>
    </Box>
  );
};

export default Routes;

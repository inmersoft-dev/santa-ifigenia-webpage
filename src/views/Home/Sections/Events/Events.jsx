/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// @mui/material
import { useTheme, Box, Button, Typography } from "@mui/material";

// own components
import Card from "../../../../components/Card/Card";
import Empty from "../../../../components/Empty/Empty";
import Error from "../../../../components/Error/Error";
import Loading from "../../../../components/Loading/Loading";
import InViewComponent from "../../../../components/InViewComponent/InViewComponent";

// services
import { eventList } from "../../../../services/events/get";

// context
import { useLanguage } from "../../../../context/LanguageProvider";
import { useNotification } from "../../../../context/NotificationProvider";

// images
import defaultTomb from "../../../../assets/images/default-tomb.jpg";

const Events = () => {
  const theme = useTheme();
  const { languageState } = useLanguage();
  const { setNotificationState } = useNotification();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const showNotification = (ntype, message) =>
    setNotificationState({
      type: "set",
      ntype,
      message,
    });

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await eventList({ count: 4, page: 1, reduced: true });
      if (response.status === 200) {
        const { list } = response;
        console.log("events", list);
        setEvents(list);
      } else {
        setEvents(-1);
        showNotification("error", String(response.error));
      }
    } catch (err) {
      setEvents(-1);
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
      <Box
        display="flex"
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <InViewComponent>
          <Typography
            variant="h2"
            sx={{ color: theme.palette.secondary.light }}
          >
            {languageState.texts.Sections.Events.Title}
          </Typography>
        </InViewComponent>
        <InViewComponent delay="0.2s" sx={{ justifyContent: "center" }}>
          <Typography
            variant="body1"
            sx={{
              width: "50%",
              marginTop: "40px",
              textAlign: "center",
              color: theme.palette.secondary.light,
            }}
          >
            {languageState.texts.Sections.Events.Body}
          </Typography>
        </InViewComponent>
        {!loading && events !== -1 && (
          <Box
            sx={{
              width: "100%",
              marginTop: { lg: "100px", md: "70px", xs: "40px" },
              display: { lg: "flex", xs: "none" },
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: {
                md: "row-reverse",
                xs: "column",
              },
            }}
          >
            <InViewComponent
              delay="0.1s"
              sx={{
                width: { xl: "50%", lg: "400px", md: "350px", xs: "100%" },
                height: { lg: "400px", xs: "300px" },
                marginBottom: { md: 0, xs: "40px" },
              }}
            >
              <Box
                component="a"
                href={`/details?id=${events[0].id}`}
                sx={{
                  width: {
                    xl: "100%",
                    lg: "400px",
                    md: "350px",
                    xs: "100%",
                  },
                  height: { lg: "400px", xs: "300px" },
                  marginLeft: { md: "40px", xs: 0 },
                  backgroundImage: `url(${
                    events[0].headerImages[0] === null
                      ? defaultTomb
                      : events[0].headerImages[0].url
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
                alignItems: {
                  md: "flex-end",
                  xs: "flex-start",
                },
                flexDirection: "column",
                width: { lg: "700px", md: "500px", xs: "100%" },
              }}
            >
              <InViewComponent delay="0.2s">
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: {
                      md: "right",
                      xs: "left",
                    },
                    color: theme.palette.secondary.light,
                  }}
                >
                  {events[0].title}
                </Typography>
              </InViewComponent>
              <InViewComponent delay="0.3s">
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: "20px",
                    textAlign: {
                      md: "right",
                      xs: "left",
                    },
                    color: theme.palette.secondary.light,
                  }}
                >
                  {events[0].subtitle.substring(0, 150)}
                  {events[0].subtitle.length > 150 ? "..." : ""}
                </Typography>
              </InViewComponent>
              <InViewComponent delay="0.4s">
                <Link
                  to={`/details?id=${events[0].id}`}
                  className={css({ textDecoration: "none" })}
                >
                  <Button
                    color="secondary"
                    sx={{
                      marginTop: "20px",
                    }}
                    variant="contained"
                  >
                    {languageState.texts.Sections.Routes.Content.Button}
                  </Button>
                </Link>
              </InViewComponent>
            </Box>
          </Box>
        )}
        {!loading && events !== -1 && (
          <Box
            sx={{
              gap: "20px",
              marginTop: { md: "70px", xs: "40px" },
              display: "flex",
              position: "relative",
              justifyContent: "center",
              flexWrap: { xl: "nowrap", xs: "wrap" },
            }}
          >
            <Card
              id={events[0].id}
              key={events[0].id}
              title={events[0].title}
              subtitle={events[0].subtitle}
              image={
                events[0].headerImages[0] === null
                  ? defaultTomb
                  : events[0].headerImages[0].url
              }
              delay="0.3s"
              limit={60}
              sx={{
                display: { lg: "none", xs: "flex" },
                minWidth: { lg: "450px", md: "100%" },
                flex: { xl: "flex !important", xs: "inherit !important" },
              }}
            />
            {events !== -1 &&
              events.splice(1, 3).map((item, i) => (
                <Card
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  image={
                    item.headerImages[0] === null
                      ? defaultTomb
                      : item.headerImages[0].url
                  }
                  delay={`0.${i + 3}s`}
                  limit={60}
                  sx={{
                    minWidth: { lg: "450px", md: "100%" },
                    flex: { xl: "flex !important", xs: "inherit !important" },
                  }}
                />
              ))}
          </Box>
        )}
        <Loading visible={loading} />
        {events !== -1 && !events.length && <Empty />}
        {events === -1 && <Error onAction={fetch} />}
      </Box>
    </Box>
  );
};

export default Events;

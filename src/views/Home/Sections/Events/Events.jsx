/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

// @mui/material
import { useTheme, Box, Typography } from "@mui/material";

// own components
import Card from "../../../../components/Card/Card";
import Empty from "../../../../components/Empty/Empty";
import Error from "../../../../components/Error/Error";
import Loading from "../../../../components/Loading/Loading";
import InViewComponent from "../../../../components/InViewComponent/InViewComponent";

// services
import { newsList } from "../../../../services/news/get";

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
      const response = await newsList({ count: 4, page: 1, reduced: true });
      if (response.status === 200) {
        const { list } = response;
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
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <InViewComponent
          sx={{
            width: "100%",
            justifyContent: { md: "center", xs: "flex-start", display: "flex" },
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: theme.palette.secondary.light }}
          >
            {languageState.texts.Sections.Events.Title}
          </Typography>
        </InViewComponent>
        <InViewComponent
          delay="0.2s"
          sx={{ justifyContent: { md: "center", xs: "flex-start" } }}
        >
          <Typography
            variant="body1"
            sx={{
              width: { md: "50%", xs: "100%" },
              marginTop: "20px",
              textAlign: { md: "center", xs: "left" },
              color: theme.palette.secondary.light,
            }}
          >
            {languageState.texts.Sections.Events.Body}
          </Typography>
        </InViewComponent>
        {!loading && events !== -1 && (
          <Box
            sx={{
              gap: "20px",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "100px",
              position: "relative",
              justifyContent: "center",
            }}
          >
            {events !== -1 &&
              events.map((item, i) => (
                <Card
                  limit={60}
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  delay={`0.${i + 3}s`}
                  subtitle={item.subtitle}
                  image={
                    item.headerImages[0] === null
                      ? defaultTomb
                      : item.headerImages[0].url
                  }
                  sx={{
                    minWidth: i === 0 ? "100%" : { lg: "450px", xs: "100%" },
                    flex:
                      i === 0
                        ? "1 !important"
                        : { lg: "1 !important", md: "inherit" },
                  }}
                />
              ))}
          </Box>
        )}
        <Loading
          visible={loading}
          color="secondary"
          sx={{ background: theme.palette.primary.main }}
        />
        {events !== -1 && !events.length && <Empty />}
        {events === -1 && <Error onAction={fetch} />}
      </Box>
    </Box>
  );
};

export default Events;

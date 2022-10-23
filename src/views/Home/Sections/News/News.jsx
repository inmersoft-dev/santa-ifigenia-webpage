/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// @mui/material
import { Box, Button, Typography } from "@mui/material";

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

const News = () => {
  const { languageState } = useLanguage();
  const { setNotificationState } = useNotification();

  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

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
        console.log("news", list);
        setNews(list);
      } else {
        setNews(-1);
        showNotification("error", String(response.error));
      }
    } catch (err) {
      setNews(-1);
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
          <Typography variant="h2">
            {languageState.texts.Sections.News.Title}
          </Typography>
        </InViewComponent>
        <InViewComponent delay="0.2s" sx={{ justifyContent: "center" }}>
          <Typography
            variant="body1"
            sx={{
              width: "50%",
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            {languageState.texts.Sections.News.Body}
          </Typography>
        </InViewComponent>
        {!loading && news !== -1 && (
          <Box
            sx={{
              width: "100%",
              marginTop: { lg: "100px", md: "70px", xs: "40px" },
              display: { lg: "flex", xs: "none" },
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: {
                md: "row",
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
                href={`/details?id=${news[0].id}`}
                sx={{
                  width: {
                    xl: "100%",
                    lg: "400px",
                    md: "350px",
                    xs: "100%",
                  },
                  height: { lg: "400px", xs: "300px" },
                  marginRight: { md: "40px", xs: 0 },
                  backgroundImage: `url(${
                    news[0].headerImages[0] === null
                      ? defaultTomb
                      : news[0].headerImages[0].url
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
                width: { lg: "700px", md: "500px", xs: "100%" },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <InViewComponent delay="0.2s">
                <Typography variant="h4">{news[0].title}</Typography>
              </InViewComponent>
              <InViewComponent delay="0.3s">
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: "20px",
                  }}
                >
                  {news[0].subtitle.substring(0, 150)}
                  {news[0].subtitle.length > 150 ? "..." : ""}
                </Typography>
              </InViewComponent>
              <InViewComponent delay="0.4s">
                <Link
                  to={`/details?id=${news[0].id}`}
                  className={css({ textDecoration: "none" })}
                >
                  <Button sx={{ marginTop: "20px" }} variant="contained">
                    {languageState.texts.Sections.Routes.Content.Button}
                  </Button>
                </Link>
              </InViewComponent>
            </Box>
          </Box>
        )}
        {!loading && news !== -1 && (
          <Box
            sx={{
              gap: "20px",
              marginTop: { md: "70px", xs: "40px" },
              display: "flex",
              position: "relative",
              justifyContent: "center",
              flexWrap: { lg: "nowrap", xs: "wrap" },
            }}
          >
            <Card
              id={news[0].id}
              key={news[0].id}
              title={news[0].title}
              subtitle={news[0].subtitle}
              image={
                news[0].headerImages[0] === null
                  ? defaultTomb
                  : news[0].headerImages[0].url
              }
              delay="0.3s"
              limit={60}
              sx={{
                display: { lg: "none", xs: "flex" },
                minWidth: { lg: "450px", md: "100%" },
                flex: { lg: "flex !important", xs: "inherit !important" },
              }}
            />
            {news !== -1 &&
              news.splice(1, 3).map((item, i) => (
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
                    flex: { lg: "flex !important", xs: "inherit !important" },
                  }}
                />
              ))}
          </Box>
        )}
        <Loading visible={loading} />
        {news !== -1 && !news.length && <Empty />}
        {news === -1 && <Error onAction={fetch} />}
      </Box>
    </Box>
  );
};

export default News;

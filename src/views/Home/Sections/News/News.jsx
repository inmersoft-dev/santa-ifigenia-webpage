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
import { newsList } from "../../../../services/news/get";

// context
import { useLanguage } from "../../../../context/LanguageProvider";
import { useNotification } from "../../../../context/NotificationProvider";

// images
import defaultTomb from "../../../../assets/images/default-tomb.jpg";

const News = () => {
  const theme = useTheme();
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
      } else showNotification("error", String(response.error));
    } catch (err) {
      console.log(err);
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
        padding: "40px 0",
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
          <Typography variant="h2" sx={{ marginBottom: "40px" }}>
            {languageState.texts.Sections.News.Title}
          </Typography>
        </InViewComponent>
        {!loading && news !== -1 && (
          <Box
            sx={{
              marginTop: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: {
                md: "row",
                xs: "column",
              },
              width: "70%",
            }}
          >
            <InViewComponent delay="0.1s">
              <Box
                component="a"
                href={`/details?id=${news[0].id}`}
                sx={{
                  width: { lg: "450px", md: "300px", xs: "250px" },
                  height: { lg: "450px", md: "300px", xs: "250px" },
                  marginRight: "40px",
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
                width: "700px",
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
        <Box
          sx={{
            gap: "20px",
            display: "flex",
            position: "relative",
            justifyContent: "center",
          }}
        >
          {news !== -1 &&
            news
              .splice(1, 3)
              .map((item, i) => (
                <Card
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  image={item.headerImages[0]}
                  delay={`0.${i + 3}s`}
                  limit={60}
                  sx={{ width: { md: "450px", xs: "340px" }, flex: "inherit" }}
                />
              ))}
        </Box>
        <Loading visible={loading} />
        {news !== -1 && !news.length && <Empty />}
        {news === -1 && <Error onAction={fetch} />}
      </Box>
    </Box>
  );
};

export default News;

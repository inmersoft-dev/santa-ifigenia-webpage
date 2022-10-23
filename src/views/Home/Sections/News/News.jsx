import { useEffect, useState } from "react";

// @mui/material
import { Box, Typography } from "@mui/material";

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
      const response = await newsList({ count: 3, page: 1, reduced: true });
      if (response.status === 200) {
        const { list } = response;
        setNews(list);
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
        minHeight: "70vh",
        alignItems: "center",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <InViewComponent>
        <Typography variant="h2" sx={{ marginBottom: "40px" }}>
          {languageState.texts.Sections.News.Title}
        </Typography>
      </InViewComponent>
      <Box
        sx={{
          gap: "20px",
          display: "flex",
          position: "relative",
          justifyContent: "center",
        }}
      >
        {news !== -1 &&
          news.map((item, i) => (
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
  );
};

export default News;

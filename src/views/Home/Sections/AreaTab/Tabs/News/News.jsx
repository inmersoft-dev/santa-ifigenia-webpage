import { useEffect, useState, useReducer, useRef } from "react";

// framer-motion
import { useInView } from "framer-motion";

// @mui/material
import { Box } from "@mui/material";

// own components
import Card from "../../../../../../components/Card/Card";
import Empty from "../../../../../../components/Empty/Empty";
import Error from "../../../../../../components/Error/Error";
import Loading from "../../../../../../components/Loading/Loading";

// services
import { newsList } from "../../../../../../services/news/get";

// context
import { useNotification } from "../../../../../../context/NotificationProvider";

const News = () => {
  const { setNotificationState } = useNotification();

  const ref = useRef(null);
  const isInView = useInView(ref);

  const showNotification = (ntype, message) =>
    setNotificationState({
      type: "set",
      ntype,
      message,
    });

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const newsReducer = (oldNews, action) => {
    const { type } = action;
    switch (type) {
      case "add": {
        const { newNews } = action;
        return [...oldNews, ...newNews];
      }
      default:
        return [];
    }
  };

  const [news, setNews] = useReducer(newsReducer, []);

  const fetch = async () => {
    try {
      const response = await newsList({ count: 3, page, reduced: true });
      if (response.status === 200) {
        const { list, totalPages } = response;
        setHasMore(page < totalPages);
        setNews({ type: "add", newNews: list });
      } else showNotification("error", String(response.error));
    } catch (err) {
      showNotification("error", String(err));
    }
  };

  useEffect(() => {
    fetch();
  }, [page]);

  useEffect(() => {
    console.log(isInView);
    if (isInView) setPage(page + 1);
  }, [isInView]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        display="flex"
        sx={{ gap: "20px", flexWrap: "wrap", minHeight: "50vh" }}
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
            />
          ))}
      </Box>
      <div ref={ref}>
        <Loading
          visible={hasMore}
          sx={{ height: "64px", position: "inherit", marginTop: "20px" }}
        />
      </div>
      {news !== -1 && !news.length && <Empty />}
      {news === -1 && <Error onAction={fetch} />}
    </Box>
  );
};

export default News;

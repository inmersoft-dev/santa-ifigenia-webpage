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
import { graveList } from "../../../../../../services/graves/get";

// context
import { useNotification } from "../../../../../../context/NotificationProvider";

const Graves = () => {
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

  const gravesReducer = (oldGraves, action) => {
    const { type } = action;
    switch (type) {
      case "add": {
        const { newGraves } = action;
        return [...oldGraves, ...newGraves];
      }
      default:
        return [];
    }
  };

  const [graves, setGraves] = useReducer(gravesReducer, []);

  const fetch = async () => {
    try {
      const response = await graveList({ count: 3, page, reduced: true });
      if (response.status === 200) {
        const { list, totalPages } = response;
        setHasMore(page < totalPages);
        console.log(list);
        setGraves({ type: "add", newGraves: list });
      } else showNotification("error", String(response.error));
    } catch (err) {
      showNotification("error", String(err));
    }
  };

  useEffect(() => {
    fetch();
  }, [page]);

  useEffect(() => {
    if (isInView) setPage(page + 1);
  }, [isInView]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        display="flex"
        sx={{ gap: "20px", flexWrap: "wrap", minHeight: "50vh" }}
      >
        {graves !== -1 &&
          graves.map((item, i) => (
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
      {graves !== -1 && !graves.length && <Empty />}
      {graves === -1 && <Error onAction={fetch} />}
    </Box>
  );
};

export default Graves;

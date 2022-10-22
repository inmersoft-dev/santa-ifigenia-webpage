import { useEffect, useState } from "react";

// @mui/material
import { Box } from "@mui/material";

// own components
import Card from "../../../../components/Card/Card";
import Empty from "../../../../components/Empty/Empty";
import Error from "../../../../components/Error/Error";
import Loading from "../../../../components/Loading/Loading";

// services
import { graveList } from "../../../../services/graves/get";

// context
import { useNotification } from "../../../../context/NotificationProvider";

const Graves = () => {
  const { setNotificationState } = useNotification();

  const [loading, setLoading] = useState(true);
  const [graves, setGraves] = useState([]);

  const showNotification = (ntype, message) =>
    setNotificationState({
      type: "set",
      ntype,
      message,
    });

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await graveList({ count: 3, page: 1, reduced: true });
      if (response.status === 200) {
        const { list } = response;
        console.log(list);
        setGraves(list);
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
        gap: "20px",
        display: "flex",
        minWidth: "100%",
        flexWrap: "wrap",
        minHeight: "70vh",
        position: "relative",
      }}
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
      <Loading visible={loading} />
      {graves !== -1 && !graves.length && <Empty />}
      {graves === -1 && <Error onAction={fetch} />}
    </Box>
  );
};

export default Graves;

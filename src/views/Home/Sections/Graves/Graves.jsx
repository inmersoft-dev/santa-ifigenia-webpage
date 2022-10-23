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
import { graveList } from "../../../../services/graves/get";

// context
import { useLanguage } from "../../../../context/LanguageProvider";
import { useNotification } from "../../../../context/NotificationProvider";

const Graves = () => {
  const { languageState } = useLanguage();
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
        setGraves(list);
      } else {
        setGraves(-1);
        showNotification("error", String(response.error));
      }
    } catch (err) {
      setGraves(-1);
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
        alignItems: "center",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <InViewComponent>
        <Typography variant="h2">
          {languageState.texts.Sections.Graves.Title}
        </Typography>
      </InViewComponent>
      <Box
        sx={{
          gap: "20px",
          marginTop: { lg: "100px", md: "70px", xs: "40px" },
          display: "flex",
          position: "relative",
          justifyContent: "center",
          flexWrap: { lg: "nowrap", xs: "wrap" },
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
              limit={60}
              sx={{
                minWidth: { lg: "450px", md: "100%" },
                flex: { lg: "flex !important", xs: "inherit !important" },
              }}
            />
          ))}
      </Box>
      <Loading visible={loading} />
      {graves !== -1 && !graves.length && <Empty />}
      {graves === -1 && <Error onAction={fetch} />}
    </Box>
  );
};

export default Graves;

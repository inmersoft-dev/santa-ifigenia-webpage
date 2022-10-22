import { useEffect } from "react";

// @mui/material
import { Box } from "@mui/material";

// own components
import Card from "../../../../../../components/Card/Card";

// services
import { graveList } from "../../../../../../services/graves/get";

// context
import { useNotification } from "../../../../../../context/NotificationProvider";

const Graves = () => {
  const { setNotificationState } = useNotification();

  const showNotification = (ntype, message) =>
    setNotificationState({
      type: "set",
      ntype,
      message,
    });

  const init = async () => {
    try {
      const response = await graveList();
      if (response.status === 200) {
        const { list, page, totalPages } = response;
        console.log(list, page, totalPages);
      } else showNotification("error", String(response.error));
    } catch (err) {
      showNotification("error", String(err));
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Box display="flex" sx={{ gap: "20px", flexWrap: "wrap" }}>
      <Card delay="0.4s" />
      <Card delay="0.5s" />
      <Card delay="0.6s" />
      <Card delay="0.7s" />
      <Card delay="0.8s" />
      <Card delay="0.9s" />
    </Box>
  );
};

export default Graves;

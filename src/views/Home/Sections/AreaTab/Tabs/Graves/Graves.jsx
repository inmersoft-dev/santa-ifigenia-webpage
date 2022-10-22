// @mui/material
import { Box } from "@mui/material";

// own components
import Card from "../../../../../../components/Card/Card";

// services
import {graveLis} 

const Graves = () => {
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

// sito components
import TabView from "sito-mui-tab-view";

// @mui/material
import { Box, Divider } from "@mui/material";

// @mui/icons-material
import RouteIcon from "@mui/icons-material/Route";
import EventIcon from "@mui/icons-material/Event";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import NewspaperIcon from "@mui/icons-material/Newspaper";

// context
import { useLanguage } from "../../../../context/LanguageProvider";

// own components
import Card from "../../../../components/Card/Card";

const AreaTab = () => {
  const { languageState } = useLanguage();

  return (
    <Box>
      <Divider />
      <TabView
        tabs={languageState.texts.Home.AreaTab.Tabs}
        icons={[
          <DoorBackIcon />,
          <RouteIcon />,
          <NewspaperIcon />,
          <EventIcon />,
        ]}
        tabsSx={{
          div: { justifyContent: "center" },
          a: { flex: 1, fontWeight: "bold" },
        }}
        content={[
          <Box display="flex" sx={{ gap: "20px", flexWrap: "wrap" }}>
            <Card delay="0.4s" />
            <Card delay="0.5s" />
            <Card delay="0.6s" />
            <Card delay="0.7s" />
            <Card delay="0.8s" />
            <Card delay="0.9s" />
          </Box>,
          <Card />,
          <Card />,
          <Card />,
        ]}
      />
    </Box>
  );
};

export default AreaTab;

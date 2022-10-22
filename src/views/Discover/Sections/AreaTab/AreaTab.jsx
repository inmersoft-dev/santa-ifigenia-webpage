// sito components
import TabView from "sito-mui-tab-view";

// @mui/material
import { Box, Divider } from "@mui/material";

// @mui/icons-material
import MapIcon from "@mui/icons-material/Map";
import RouteIcon from "@mui/icons-material/Route";
import EventIcon from "@mui/icons-material/Event";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import NewspaperIcon from "@mui/icons-material/Newspaper";

// context
import { useLanguage } from "../../../../context/LanguageProvider";

// own components
import Card from "../../../../components/Card/Card";

// tabs
import News from "./Tabs/News/News";
import Graves from "./Tabs/Graves/Graves";
import Routes from "./Tabs/Routes/Routes";
import Events from "./Tabs/Events/Events";

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
          <MapIcon />,
        ]}
        tabsSx={{
          div: { justifyContent: "center" },
          a: { flex: 1, fontWeight: "bold" },
        }}
        content={[<Graves />, <Routes />, <News />, <Events />]}
      />
    </Box>
  );
};

export default AreaTab;

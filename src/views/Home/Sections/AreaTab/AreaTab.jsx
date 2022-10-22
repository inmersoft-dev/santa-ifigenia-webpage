// sito components
import TabView from "sito-mui-tab-view";

// context
import { useLanguage } from "../../../../context/LanguageProvider";

const AreaTab = () => {
  const { languageState } = useLanguage();

  return (
    <TabView
      tabs={languageState.texts.Home.AreaTab.Tabs}
      tabsSx={{ a: { flex: 1 } }}
      content={[1, 2, 3, 4]}
    />
  );
};

export default AreaTab;

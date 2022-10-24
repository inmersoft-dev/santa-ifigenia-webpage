/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/function-component-definition */
import PropTypes from "prop-types";

// @mui icons
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

// @mui components
import { useTheme, Typography } from "@mui/material";

// sito components
import SitoContainer from "sito-container";

// context
import { useLanguage } from "../../context/LanguageProvider";

const Empty = (props) => {
  const theme = useTheme();
  const { sx, icon } = props;

  const { languageState } = useLanguage();

  return (
    <SitoContainer
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "500px", ...sx }}
      flexDirection="column"
    >
      {icon}
      <Typography
        sx={{ marginTop: "15px", color: theme.palette.disabled.main }}
        variant="subtitle1"
      >
        {languageState.texts.Empty.Body}
      </Typography>
    </SitoContainer>
  );
};

Empty.defaultProps = {
  sx: {},
  icon: <ReceiptLongIcon color="disabled" size="large" />,
  title: undefined,
  button: undefined,
};

Empty.propTypes = {
  sx: PropTypes.object,
  icon: PropTypes.node,
};

export default Empty;

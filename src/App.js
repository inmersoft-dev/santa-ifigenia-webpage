import { useEffect } from "react";

// react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// theme
import { ThemeProvider } from "@mui/material/styles";
import dark from "./assets/theme/dark";
import light from "./assets/theme/light";

// @mui/x-date-pickers
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// @mui/material
import { Box, CssBaseline } from "@mui/material";

// contexts
import { useMode } from "./context/ModeProvider";

// own components
import Notification from "./components/Notification/Notification";

// layouts
import View from "./layouts/View/View";

// views
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound/NotFound";

const App = () => {
  const { modeState } = useMode();

  useEffect(() => {
    document.body.style.transition = "all 200ms ease";
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={modeState.mode === "light" ? light : dark}>
        <CssBaseline />
        <Notification />
        <Box className="App">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<View />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;

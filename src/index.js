import * as ReactDOMClient from "react-dom/client";
import "@fontsource/roboto";
import "@fontsource/roboto-slab";
import "@fontsource/libre-baskerville"

// context
import { LanguageProvider } from "./context/LanguageProvider";
import { NotificationProvider } from "./context/NotificationProvider";

// styles
import "./index.css";

// app
import App from "./App";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.

root.render(
  <LanguageProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </LanguageProvider>
);

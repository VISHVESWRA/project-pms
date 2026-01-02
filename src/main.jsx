import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </PrimeReactProvider>
);

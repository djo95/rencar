import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { MaterialUIControllerProvider } from "context";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-international-phone/style.css";
import "./app.css";
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <App />
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </Provider>
);

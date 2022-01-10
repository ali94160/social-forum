import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AllRoutes from "./router/AllRoutes";

ReactDOM.render(
  <React.StrictMode>
    <AllRoutes>
      <App />
    </AllRoutes>
  </React.StrictMode>,
  document.getElementById("root")
);

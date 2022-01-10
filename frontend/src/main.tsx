import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AllRoutes from "./router/AllRoutes";
import AllContexts from "./context/AllContexts";

ReactDOM.render(
  <React.StrictMode>
    <AllContexts>
      <AllRoutes>
        <App />
      </AllRoutes>
    </AllContexts>
  </React.StrictMode>,
  document.getElementById("root")
);

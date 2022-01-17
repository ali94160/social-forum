import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AllContexts from "./context/AllContexts";

ReactDOM.render(
  <React.StrictMode>
    <AllContexts>
        <App />
    </AllContexts>
  </React.StrictMode>,
  document.getElementById("root")
);

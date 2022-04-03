import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SumListProvider } from "./SumListContext";
import { SummonerProvider } from "./SummonerContext";

ReactDOM.render(
  <React.StrictMode>
    <SumListProvider>
      <SummonerProvider>
        <App />
      </SummonerProvider>
    </SumListProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

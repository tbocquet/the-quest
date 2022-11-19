import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SumListProvider } from "./Context/SumListContext";
import { SummonerProvider } from "./Context/SummonerContext";
import { SummonerMasteriesProvider } from "./Context/SummonerMasteries";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <SumListProvider>
      <SummonerProvider>
        <SummonerMasteriesProvider>
          <App />
        </SummonerMasteriesProvider>
      </SummonerProvider>
    </SumListProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { MasteriesFiltersProvider } from "./Context/MasteriesFilterContext";
import { SumListProvider } from "./Context/SumListContext";
import { SummonerProvider } from "./Context/SummonerContext";
import { SummonerMasteriesProvider } from "./Context/SummonerMasteries";
import "./index.css";
import { Router } from "./Router";

ReactDOM.render(
  <React.StrictMode>
    <SumListProvider>
      <SummonerProvider>
        <SummonerMasteriesProvider>
          <MasteriesFiltersProvider>
            <Router />
          </MasteriesFiltersProvider>
        </SummonerMasteriesProvider>
      </SummonerProvider>
    </SumListProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

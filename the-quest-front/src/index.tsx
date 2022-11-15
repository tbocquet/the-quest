import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SearchProvider } from "./Context/SearchContext";
import { SumListProvider } from "./Context/SumListContext";
import { SummonerProvider } from "./Context/SummonerContext";
import { SummonerMasteriesProvider } from "./Context/SummonerMasteries";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <SumListProvider>
      <SummonerProvider>
        <SearchProvider>
          <SummonerMasteriesProvider>
            <App />
          </SummonerMasteriesProvider>
        </SearchProvider>
      </SummonerProvider>
    </SumListProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

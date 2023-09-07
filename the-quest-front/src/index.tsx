import React from "react";
import ReactDOM from "react-dom";
import { MasteriesFiltersProvider } from "./context/MasteriesFilterContext";
import { SumListProvider } from "./context/SumListContext";
import "./index.css";
import { Router } from "./routing/Router";

ReactDOM.render(
  <React.StrictMode>
    <SumListProvider>
      <MasteriesFiltersProvider>
        <Router />
      </MasteriesFiltersProvider>
    </SumListProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import { createRoot } from "react-dom/client";
import { MasteriesFiltersProvider } from "./context/MasteriesFilterContext";
import { SumListProvider } from "./context/SumListContext";
import "./index.css";
import { Router } from "./Router";
import { EnableAnimationProvider } from "./context/EnableAnimationsContext";
import { ChampionsFiltersProvider } from "./context/ChampionsFilterContext";

const app = document.getElementById("root") as HTMLElement;

const root = createRoot(app);

root.render(
  <React.StrictMode>
    <SumListProvider>
      <MasteriesFiltersProvider>
        <ChampionsFiltersProvider>
          <EnableAnimationProvider>
            <Router />
          </EnableAnimationProvider>
        </ChampionsFiltersProvider>
      </MasteriesFiltersProvider>
    </SumListProvider>
  </React.StrictMode>
);

import React from "react";
import { createRoot } from "react-dom/client";
import { MasteriesFiltersProvider } from "./context/MasteriesFilterContext";
import { SumListProvider } from "./context/SumListContext";
import "./index.css";
import { Router } from "./Router";
import { EnableAnimationProvider } from "./context/EnableAnimationsContext";
import { ChampionsFiltersProvider } from "./context/ChampionsFilterContext";
import { LiveGameOptionsprovider } from "./context/LiveGameOptionsContext";

const app = document.getElementById("root") as HTMLElement;

const root = createRoot(app);

root.render(
  <React.StrictMode>
    <SumListProvider>
      <MasteriesFiltersProvider>
        <ChampionsFiltersProvider>
          <EnableAnimationProvider>
            <LiveGameOptionsprovider>
              <Router />
            </LiveGameOptionsprovider>
          </EnableAnimationProvider>
        </ChampionsFiltersProvider>
      </MasteriesFiltersProvider>
    </SumListProvider>
  </React.StrictMode>
);

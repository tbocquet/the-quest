import React from "react";
import { createRoot } from "react-dom/client";
import { MasteriesFiltersProvider } from "./context/MasteriesFilterContext";
import { SumListProvider } from "./context/SumListContext";
import "./index.css";
import { Router } from "./routing/Router";
import App from "./components/AllChampionsPage/example/App";
import { EnableAnimationProvider } from "./context/EnableAnimationsContext";

const app = document.getElementById("root") as HTMLElement;

const root = createRoot(app);

root.render(
  <React.StrictMode>
    <SumListProvider>
      <MasteriesFiltersProvider>
        <EnableAnimationProvider>
          <Router />
        </EnableAnimationProvider>
      </MasteriesFiltersProvider>
    </SumListProvider>
  </React.StrictMode>
);

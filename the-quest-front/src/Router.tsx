import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./routes/Root";
import { Home } from "@/components/Home/Home";
import { Summoner } from "./routes/Summoner";
import { summonerDataLoader as loader } from "@/utils/summonerMateries";
import { SummonerMasteries } from "./routes/SummonerMasteries";
import { SummonerNotFound } from "@/components/SummonerNotFound";
import { SummonerSuccess } from "./routes/SummonerSuccess";
import { Error } from "./routes/Error";
import { LiveGamePage } from "./routes/LiveGame";
import { ChampionsPage } from "./routes/ChampionsPage";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        { path: "/champions", element: <ChampionsPage /> },
        {
          path: "/liveGame/:gameName/:tagLine",
          element: <LiveGamePage />,
        },
        {
          path: "/invocateur/:gameName/:tagLine",
          element: <Summoner />,
          id: "summoner",
          loader: loader,
          errorElement: <SummonerNotFound />,
          children: [
            {
              path: "/invocateur/:gameName/:tagLine",
              element: <SummonerMasteries />,
            },
            {
              path: "/invocateur/:gameName/:tagLine/accomplissements",
              element: <SummonerSuccess />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

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
import Champions from "./routes/Champions";

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
        { path: "/champions", element: <Champions /> },
        {
          path: "/liveGame/:summonerName",
          element: <LiveGamePage />,
        },
        {
          path: "/invocateur/:summonerName",
          element: <Summoner />,
          id: "summoner",
          loader: loader,
          errorElement: <SummonerNotFound />,
          children: [
            {
              path: "/invocateur/:summonerName",
              element: <SummonerMasteries />,
            },
            {
              path: "/invocateur/:summonerName/accomplissements",
              element: <SummonerSuccess />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

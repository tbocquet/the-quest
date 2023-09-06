import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SuccessBlock } from "./Success/Success";
import { ErrorPage } from "./routes/ErrorPage";
import { Root } from "./routes/Root";
import { Home } from "./Home/Home";
import { Summoner } from "./routes/Summoner";
import { summonerDataLoader as loader } from "./functions";
import { SummonerMasteries } from "./routes/SummonerMasteries";
import { SummonerNotFound } from "./SummonerNotFound";

export function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        // {
        //   path: "/champions",
        //   element: <Summoner />,
        // },
        {
          path: "/summoner/:summonerName",
          element: <Summoner />,
          loader: loader,
          errorElement: <SummonerNotFound />,
          children: [
            {
              path: "/summoner/:summonerName",
              element: <SummonerMasteries />,
              loader: loader,
            },
            {
              path: "/summoner/:summonerName/success",
              element: <SuccessBlock />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

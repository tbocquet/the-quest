import "./App.scss";
import championData from "./champion.json";

import React from "react";
import { Header } from "./Header/Header";
import { Masteries } from "./Masteries/Masteries";
import { useSummoner } from "./Context/SummonerContext";
import { useSumList } from "./Context/SumListContext";
import { useState, useEffect } from "react";
import { getSummonerDataById, getSummonerMasteriesById } from "./API_call";
import { Mastery, Champion, ChampionMastery } from "./type";
import { Loader } from "./Loader";
import { SummonerNotFound } from "./SummonerNotFound";
import { SummonerStats } from "./SummonerStats/SummonerStats";
import { SuccessBlock } from "./Success/Success";
import { useSummonerMasteries } from "./Context/SummonerMasteries";
import { Home } from "./Home/Home";
import { aggregateMasteriesData } from "./functions";

function App() {
  /*Context*/
  const { summonerId } = useSummoner();
  const { setSumList } = useSumList();
  const { sumMasteryList, setSumMasteryList } = useSummonerMasteries();

  /*Data*/
  const allChampions: Champion[] = championData;

  /*States*/
  const [masteries, setMasteries] = useState<Mastery[] | null>(null);
  const [champMasteries, setChampMasteries] =
    useState<ChampionMastery[]>(sumMasteryList);
  const [error, setError] = useState<boolean>(false);
  const [onglet, setOnglet] = useState(0);

  /*Récupérations des masteries et des données de l'invocateur*/
  useEffect(() => {
    if (summonerId !== "" && summonerId !== "-1") {
      /*Rajouter le summoner dans l'historique de recherche*/
      getSummonerDataById(summonerId).then((data) => {
        setSumList(data);
      });

      getSummonerMasteriesById(summonerId)
        .then((data) => {
          //On tri par taille de mastery
          const M = data.sort((a: Mastery, b: Mastery) =>
            a.championPoints > b.championPoints ? -1 : 1
          );

          if (M !== null) {
            //On aggrège les données des masteries et des champions connus par le Front
            const res = aggregateMasteriesData(M, allChampions);

            setSumMasteryList(res);
            setChampMasteries(res);
          }
          setMasteries(M);
          setError(false);
        })
        .catch((error) => {
          setError(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allChampions, summonerId]);

  return (
    <div className="App">
      {/* <RouterProvider router={router} /> */}

      {summonerId !== "" ? (
        <React.Fragment>
          <Header />
          {error || summonerId === "-1" ? (
            <SummonerNotFound />
          ) : !masteries ? (
            <Loader />
          ) : (
            <React.Fragment>
              {/* <SummonerStats summonerId={summonerId} masteries={masteries} /> */}
              <nav className="the-quest-app-nav">
                <ul>
                  <li
                    className={onglet === 0 ? "selected" : ""}
                    onClick={() => setOnglet(0)}
                  >
                    Maîtrises
                  </li>
                  <li
                    className={onglet === 1 ? "selected" : ""}
                    onClick={() => setOnglet(1)}
                  >
                    Succès
                  </li>
                </ul>
              </nav>
              {onglet === 0 && <Masteries masteries={champMasteries} />}
              {onglet === 1 && <SuccessBlock />}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <>
          <Home />
        </>
      )}
    </div>
  );
}

export default App;

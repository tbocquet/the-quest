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
  }, [summonerId]);

  //Agrège les Masteries et les Champions en un unique object
  function aggregateMasteriesData(
    masteryList: Mastery[],
    championList: Champion[]
  ): ChampionMastery[] {
    return masteryList.reduce((resList: ChampionMastery[], M: Mastery) => {
      const C: Champion | undefined = championList.find(
        (champ) => parseInt(champ.key) === M.championId
      );
      if (C !== undefined)
        return [
          ...resList,
          {
            id: C.id,
            championKey: M.championId,
            level: M.championLevel,
            points: M.championPoints,
            pointsSinceLastLevel: M.championPointsSinceLastLevel,
            pointsUntilNextLevel: M.championPointsUntilNextLevel,
            chestGranted: M.chestGranted,
            tokensEarned: M.tokensEarned,
            name: C.name,
            url: C.url,
            lane: C.lane,
            tags: C.tags,
            region: C.region !== undefined ? C.region : "",
          },
        ];
      else return resList;
    }, []);
  }

  return (
    <div className="App">
      {summonerId !== "" ? (
        <React.Fragment>
          <Header />
          {error || summonerId === "-1" ? (
            <SummonerNotFound />
          ) : !masteries ? (
            <Loader />
          ) : (
            <React.Fragment>
              <SummonerStats summonerId={summonerId} masteries={masteries} />
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

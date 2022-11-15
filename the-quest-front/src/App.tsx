import "./App.scss";
import championData from "./champion.json";

import React from "react";
import { Header } from "./Header/Header";
import { Masteries } from "./Masteries/Masteries";
import { useSearch } from "./Context/SearchContext";
import { useSummoner } from "./Context/SummonerContext";
import { useSumList } from "./Context/SumListContext";
import { useState, useEffect } from "react";
import {
  getSummonerDataById,
  getSummonerDataByName,
  getSummonerMasteriesById,
} from "./API_call";
import { Mastery, Champion, ChampionMastery } from "./type";
import { Loader } from "./Loader";
import { SummonerNotFound } from "./SummonerNotFound";
import { SummonerStats } from "./SummonerStats/SummonerStats";
import { SuccessBlock } from "./Success/Success";
import { useSummonerMasteries } from "./Context/SummonerMasteries";

function App() {
  /*Context*/
  const { summonerId, setSummonerId } = useSummoner();
  const { search, setSearch } = useSearch();
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

  /*Récupérations des données de l'invocateur à partir de la barre de recherche*/
  useEffect(() => {
    search !== "" &&
      getSummonerDataByName(search)
        .then((data) => {
          setSummonerId(data.id);
          setSumList(data);
          setError(false);
        })
        .catch(() => setError(true));
  }, [search]);

  /*Récupérations des masteries et des données de l'invocateur*/
  useEffect(() => {
    if (summonerId !== "") {
      getSummonerDataById(summonerId).then((data) => {
        setSumList(data);
        setSearch("");
      });

      getSummonerMasteriesById(summonerId)
        .then((data) => {
          const M = data.sort((a: Mastery, b: Mastery) =>
            a.championPoints > b.championPoints ? -1 : 1
          );

          if (M !== null) {
            //On aggrège les données des masteries et des champions connus par le Front
            const res = M.reduce(
              (masteryList: ChampionMastery[], mastery: Mastery) => {
                const C: Champion | undefined = allChampions.find(
                  (champ) => parseInt(champ.key) === mastery.championId
                );
                if (C !== undefined)
                  return [
                    ...masteryList,
                    {
                      id: C.id,
                      championKey: mastery.championId,
                      level: mastery.championLevel,
                      points: mastery.championPoints,
                      pointsSinceLastLevel:
                        mastery.championPointsSinceLastLevel,
                      pointsUntilNextLevel:
                        mastery.championPointsUntilNextLevel,
                      chestGranted: mastery.chestGranted,
                      tokensEarned: mastery.tokensEarned,
                      name: C.name,
                      url: C.url,
                      tags: C.tags,
                    },
                  ];
                else return masteryList;
              },
              []
            );
            setSumMasteryList(res);
            setChampMasteries(res);
          }
          setMasteries(M);
          setError(false);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    }
  }, [summonerId]);

  return (
    <div className="App">
      <Header />
      {summonerId !== null && summonerId !== "error" && (
        <React.Fragment>
          {error ? (
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
                    Maîtrise
                  </li>
                  <li
                    className={onglet === 1 ? "selected" : ""}
                    onClick={() => setOnglet(1)}
                  >
                    Success
                  </li>
                </ul>
              </nav>
              {onglet === 0 && <Masteries masteries={champMasteries} />}
              {onglet === 1 && <SuccessBlock />}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default App;

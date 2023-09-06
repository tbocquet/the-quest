import { Outlet, useLoaderData } from "react-router-dom";
import { SummonerStats } from "../SummonerStats/SummonerStats";
import { SummonerNavBar } from "../SummonerNavBar/SummonerNavBar";
import { useEffect } from "react";
import { ChampionMastery, SummonerData } from "../type";
import { useSumList } from "../Context/SumListContext";

export function Summoner() {
  //Récupération des données du loader
  const data = useLoaderData() as any;
  const summonerData = data.summonerData as SummonerData;
  const summonerMasteries = data.summonerMasteries as ChampionMastery[];

  // Context
  // const { summonerId } = useSummoner(); //Invocateur actuellement recherché
  const { setSumList } = useSumList(); //Historique des invocateurs recherchés

  useEffect(() => {
    setSumList(summonerData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summonerData]);

  return (
    <>
      <SummonerStats
        summonerData={summonerData}
        summonerMasteries={summonerMasteries}
      />
      <SummonerNavBar />
      <Outlet />
    </>
  );
}

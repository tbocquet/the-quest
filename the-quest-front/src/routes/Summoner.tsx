import { Outlet, useLoaderData } from "react-router-dom";
import { SummonerStats } from "@/components/SummonerStats/SummonerStats";
import { SummonerNavBar } from "@/components/SummonerNavBar/SummonerNavBar";
import { useEffect } from "react";
import { ChampionMastery } from "@/models/ChampionMastery";
import { useSumList } from "@/context/SumListContext";
import { SummonerData } from "@/models/Summoner";

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
      <SummonerNavBar currentUser={summonerData.name} />
      <Outlet />
    </>
  );
}

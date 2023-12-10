import { Outlet, useLoaderData } from "react-router-dom";
import { SummonerStats } from "@/components/SummonerStats/SummonerStats";
import { SummonerNavBar } from "@/components/SummonerNavBar/SummonerNavBar";
import { useEffect } from "react";
import { ChampionMastery } from "@/models/ChampionMastery";
import { useSumList } from "@/context/SumListContext";
import { SummonerData } from "@/models/Summoner";
import { SummonerAccount } from "@/models/SummonerAccount";

export function Summoner() {
  //Récupération des données du loader
  const data = useLoaderData() as any;
  const summonerData = data.summonerData as SummonerData;
  const summonerMasteries = data.summonerMasteries as ChampionMastery[];
  const summonerAccount = data.summonerAccount as SummonerAccount;

  // Context
  // const { summonerId } = useSummoner(); //Invocateur actuellement recherché
  const { setSumList } = useSumList(); //Historique des invocateurs recherchés

  useEffect(() => {
    setSumList(summonerAccount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summonerData]);

  return (
    <>
      <SummonerStats
        summonerAccount={summonerAccount}
        summonerData={summonerData}
        summonerMasteries={summonerMasteries}
      />
      <SummonerNavBar
        currentUser={{
          gameName: summonerAccount.gameName,
          tagLine: summonerAccount.tagLine,
        }}
      />
      <Outlet />
    </>
  );
}

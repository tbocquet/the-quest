import { useRouteLoaderData } from "react-router-dom";
import { ChampionMastery } from "@/models/ChampionMastery";
import { SuccessBlock } from "@/components/Success/Success";

export function SummonerSuccess() {
  const data = useRouteLoaderData("summoner") as any;
  const summonerMasteries = data.summonerMasteries as ChampionMastery[];

  return <SuccessBlock sumMasteryList={summonerMasteries} />;
}

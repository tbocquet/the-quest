import { useRouteLoaderData } from "react-router-dom";
import { ChampionMastery } from "@/type";
import { Masteries } from "../../components/Masteries/Masteries";

export function SummonerMasteries() {
  const data = useRouteLoaderData("summoner") as any;
  const summonerMasteries = data.summonerMasteries as ChampionMastery[];

  return <Masteries masteries={summonerMasteries} />;
}

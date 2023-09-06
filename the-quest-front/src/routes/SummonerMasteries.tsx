import { useLoaderData } from "react-router-dom";
import { ChampionMastery } from "../type";
import { Masteries } from "../Masteries/Masteries";

export function SummonerMasteries() {
  const data = useLoaderData() as any;
  const summonerMasteries = data.summonerMasteries as ChampionMastery[];

  return <Masteries masteries={summonerMasteries} />;
}

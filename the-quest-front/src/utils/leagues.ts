import { LolAPISummonerLeague } from "@/models/liveGame";

export function getFlexQDataFromLeagueTable(T: LolAPISummonerLeague[]) {
  return T.find((league) => league.queueType === "RANKED_FLEX_SR");
}

export function getSoloQDataFromLeagueTable(T: LolAPISummonerLeague[]) {
  return T.find((league) => league.queueType === "RANKED_SOLO_5x5");
}

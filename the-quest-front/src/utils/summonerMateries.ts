import { getSummonerMateriesByPuuid } from "../services/masteries";
import { ChampionMastery, Mastery } from "../models/ChampionMastery";
import championData from "../assets/champion.json";
import {
  getSummonerAccountByRiotId,
  getSummonerDataByRiotId,
} from "@/services/summoner";
import { SummonerData } from "@/models/Summoner";
import { RiotId } from "@/models/RiotId";
import { Champion } from "@/models/Champion";
import { SummonerAccount } from "@/models/SummonerAccount";

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
          region: C.region,
        },
      ];
    else return resList;
  }, []);
}

export const getSummonerChampionMasteries = async (
  puuid: string
): Promise<ChampionMastery[]> => {
  const allChampions: Champion[] = championData;
  try {
    const sumMasteriesData = await getSummonerMateriesByPuuid(puuid);
    const M = sumMasteriesData.sort((a: Mastery, b: Mastery) =>
      a.championPoints > b.championPoints ? -1 : 1
    );

    //On aggrège les données des masteries et des données champions du Front
    if (M !== null) {
      return aggregateMasteriesData(M, allChampions);
    }
  } catch (error) {
    console.error(`Error in getSummonerChampionMasteries ${error}`);
  }
  return [];
};

export async function summonerDataLoader({ params }: any) {
  const riotId: RiotId = { gameName: params.gameName, tagLine: params.tagLine };
  const accountData = await getSummonerAccountByRiotId(
    riotId.gameName,
    riotId.tagLine
  );
  const summonerData = (await getSummonerDataByRiotId(riotId)) as SummonerData;
  const summonerMasteries = (await getSummonerChampionMasteries(
    accountData.puuid
  )) as ChampionMastery[];

  const summonerAccount: SummonerAccount = {
    gameName: accountData.gameName,
    tagLine: accountData.tagLine,
    puuid: accountData.puuid,
    summonerId: summonerData.id,
    profileIconId: summonerData.profileIconId,
  };
  return {
    summonerData,
    summonerMasteries,
    summonerAccount,
  };
}

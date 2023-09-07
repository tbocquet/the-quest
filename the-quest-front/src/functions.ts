import { getSummonerDataByName, getSummonerMasteriesById } from "./API_call";
import { Champion, ChampionMastery, Mastery, SummonerData } from "./type";
import championData from "./assets/champion.json";

  //Agrège les Masteries et les Champions en un unique object
  export function aggregateMasteriesData(
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


  export const getSummonerChampionMasteries = async (summonerId: string): Promise<ChampionMastery[]> => {
    const allChampions: Champion[] = championData;
    try {
      const sumMasteriesData = await getSummonerMasteriesById(summonerId);
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

  export async function summonerDataLoader({params}: any) {
    const summonerData = await getSummonerDataByName(params.summonerName) as SummonerData;
    const summonerMasteries = await getSummonerChampionMasteries(summonerData.id) as ChampionMastery[];
    return { summonerData,summonerMasteries };
  }
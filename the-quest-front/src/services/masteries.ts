import axios from "axios";
import championData from "../assets/champion.json";
import { Mastery } from "../models/ChampionMastery";

const SERVER_URL = import.meta.env.VITE_APP_BACKEND_URL;

function addChampWithNoMastery(masteries: Mastery[]): Mastery[] {
  const masteriesWithAllChamp: Mastery[] = championData.map((champ) => {
    const M = masteries.find((elt) => elt.championId === parseInt(champ.key));

    if (M !== undefined) {
      return M;
    } else {
      return {
        championId: parseInt(champ.key),
        championLevel: 0,
        championPoints: 0,
        lastPlayTime: 0,
        championPointsSinceLastLevel: 0,
        championPointsUntilNextLevel: 0,
        chestGranted: false,
        tokensEarned: 0,
      };
    }
  });
  return masteriesWithAllChamp;
}

// export function getSummonerMasteriesByName(summonerName: string) {
//   return axios
//     .get(`${SERVER_URL}api/lol/masteriesBySummonerName/${summonerName}`)
//     .then((res) => addChampWithNoMastery(res.data));
// }

// export function getSummonerMasteriesById(summonerId: string) {
//   return axios
//     .get(`${SERVER_URL}api/lol/masteriesBySummonerId/${summonerId}`)
//     .then((res) => addChampWithNoMastery(res.data));
// }

export function getSummonerMateriesByPuuid(puuid: string) {
  return axios
    .get(`${SERVER_URL}riot/masteriesByPuuid/${puuid}`)
    .then((res) => addChampWithNoMastery(res.data));
}

export function getChampionNameFromId(id: number) {
  const champion = championData.find((champ) => champ.key === id.toString());
  if (!champion) return "";
  else return champion.name;
}

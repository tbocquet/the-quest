import axios from "axios";
import championData from "./champion.json";
import { Mastery } from "./type";

const SERVER_URL: string = process.env.REACT_APP_SERVER_URL as string;

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

export function getSummonerMasteriesByName(summonerName: string) {
  return axios
    .get(`${SERVER_URL}api/lol/masteriesBySummonerName/${summonerName}`)
    .then((res) => addChampWithNoMastery(res.data));
}

export function getSummonerMasteriesById(summonerId: string) {
  return axios
    .get(`${SERVER_URL}api/lol/masteriesBySummonerId/${summonerId}`)
    .then((res) => addChampWithNoMastery(res.data));
}

export function getSummonerDataById(summonerId: string) {
  return axios
    .get(`${SERVER_URL}api/lol/summonerById/${summonerId}`)
    .then((res) => res.data);
}

export function getSummonerDataByName(summonerName: string) {
  return axios
    .get(`${SERVER_URL}api/lol/summonerByName/${summonerName}`)
    .then((res) => res.data);
}

export function getSummonerProfileIcon(iconId: number): string {
  return `${SERVER_URL}images/profileIcon/${iconId}.png`;
}

export function getSummonerDefaultProfileIcon(): string {
  //return `${SERVER_URL}images/profileIcon/default.png`;
  return "/profileIcons/default.png";
}

import axios from "axios";

const SERVER_URL: string = process.env.REACT_APP_SERVER_URL as string;

/*Deprecated*/
export function getAllChampions() {
  return axios.get(`${SERVER_URL}api/lol/champions`).then((res) => res.data);
}

export function getSummonerMasteriesByName(summonerName: string) {
  return axios
    .get(`${SERVER_URL}api/lol/masteriesBySummonerName/${summonerName}`)
    .then((res) => res.data);
}

export function getSummonerMasteriesById(summonerId: string) {
  return axios
    .get(`${SERVER_URL}api/lol/masteriesBySummonerId/${summonerId}`)
    .then((res) => res.data);
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

import axios from "axios";

const SERVER_URL: string = process.env.REACT_APP_SERVER_URL as string;

export function getAllChampions() {
  return axios.get(`${SERVER_URL}api/lol/champions`).then((res) => res.data);
}

export function getSummonerMasteries(summonerName: string) {
  return axios
    .get(`${SERVER_URL}api/lol/masteries/${summonerName}`)
    .then((res) => res.data);
}

export function getSummonerInfo(summonerName: string) {
  return axios
    .get(`${SERVER_URL}api/lol/summoner/${summonerName}`)
    .then((res) => res.data);
}

export function getSummonerProfileIcon(iconId: number): string {
  return `${SERVER_URL}images/profileIcon/${iconId}.png`;
}

import axios from "axios";

export function getAllChampions() {
  return axios
    .get("http://localhost:3000/api/lol/champions")
    .then((res) => res.data);
}

export function getSummonerMasteries(summonerName: string) {
  return axios
    .get(`http://localhost:3000/api/lol/masteries/${summonerName}`)
    .then((res) => res.data);
}

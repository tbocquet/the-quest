import { Champion } from "../models/type";
import championData from "../assets/champion.json";

const allChampions: Champion[] = championData;

export function getChampion(championId: number): Champion {
  const res = allChampions.find((champ) => champ.key === championId.toString());
  if (res) return res;

  console.log("Error getting champion" + championId);
  return {
    id: "Unknow",
    key: championId.toString(),
    name: "Unknow",
    url: "/images/blitz_question.png",
    lane: [],
    tags: [],
    region: [],
  };
}

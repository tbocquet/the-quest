import championData from "../assets/champion.json";

export type Champion = {
  id: string;
  key: string;
  name: string;
  url: string;
  lane: string[];
  tags: string[];
  region: string[];
};

export function getChampionDataFromJson(championId:string) :Champion | undefined{
  const champion = championData.find((champ) => champ.id.toLowerCase() === championId.toLowerCase());
  return champion;
}
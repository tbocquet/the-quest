import { ChampionDetails } from "@/models/ChampionDetails";
import allChampions from "../assets/champion.json";
import ky from "ky";
import { toInteger } from "lodash";

export async function getChampionDetails(
  championId: string
): Promise<ChampionDetails | null> {
  const version = "13.21.1";
  const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/fr_FR/champion/${championId}.json`;
  try {
    const data: any = await ky.get(url).json();

    return data.data[championId] as ChampionDetails;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function getChampionKeyFromChampionId(championId:string):number{
  const res = allChampions.find(C => C.id === championId)?.key
  return res ? toInteger(res) : 0
}
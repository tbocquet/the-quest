import { ChampionDetails } from "@/models/ChampionDetails";
import ky from "ky";

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

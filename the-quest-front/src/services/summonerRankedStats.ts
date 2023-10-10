import { SummonerLeague } from "@/models/SummonerLeague";
import ky from "ky";
const SERVER_URL = import.meta.env.VITE_APP_BACKEND_URL;

export async function getSummonerLeagues(summonerId: string): Promise<any> {
  const url = `${SERVER_URL}riot/leagues/${summonerId}`;
  try {
    const data: any = await ky.get(url).json();
    return data as SummonerLeague;
  } catch (e) {
    console.log(e);
    return null;
  }
}

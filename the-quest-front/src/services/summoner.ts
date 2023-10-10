import { SummonerData } from "@/models/Summoner";
import ky from "ky";
const SERVER_URL = import.meta.env.VITE_APP_BACKEND_URL;

export async function getSummonerDataById(summonerId: string): Promise<any> {
  const url = `${SERVER_URL}api/lol/summonerById/${summonerId}`;
  try {
    const data: any = await ky.get(url).json();
    return data as SummonerData;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getSummonerDataByName(summonerId: string): Promise<any> {
  const url = `${SERVER_URL}api/lol/summonerByName/${summonerId}`;
  try {
    const data: any = await ky.get(url).json();
    return data as SummonerData;
  } catch (e) {
    console.log(e);
    return null;
  }
}

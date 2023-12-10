import { RiotId } from "@/models/RiotId";
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

// export async function getSummonerDataByName(summonerId: string): Promise<any> {
//   const url = `${SERVER_URL}api/lol/summonerByName/${summonerId}`;
//   try {
//     const data: any = await ky.get(url).json();
//     return data as SummonerData;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
// }

export async function getSummonerDataByRiotId(rid: RiotId): Promise<any> {
  const url = `${SERVER_URL}riot/summonerByRiotId/${rid.gameName}/${rid.tagLine}`;
  try {
    const data: any = await ky.get(url).json();
    return data as SummonerData;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getSummonerAccountByRiotId(
  gameName: string,
  tagLine: string
): Promise<any> {
  const url = `${SERVER_URL}riot/riotAccountByRiotID/${gameName}/${tagLine}`;
  try {
    const data: any = await ky.get(url).json();
    return data as SummonerData;
  } catch (e) {
    console.log(e);
    return null;
  }
}

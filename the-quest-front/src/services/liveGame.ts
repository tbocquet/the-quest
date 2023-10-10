import { LiveGame } from "@/models/LiveGame";
import ky from "ky";
const SERVER_URL = import.meta.env.VITE_APP_BACKEND_URL;

export async function getLiveGame(
  summonerId: string
): Promise<null | LiveGame> {
  const url = `${SERVER_URL}livegame/${summonerId}`;
  try {
    const data: any = await ky.get(url).json();
    return data as LiveGame;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getLiveGameBySummonerName(
  summonerName: string
): Promise<null | LiveGame> {
  const url = `${SERVER_URL}livegameByName/${summonerName}`;
  try {
    const data: any = await ky.get(url).json();
    return data as LiveGame;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getPersistantLiveGame(): Promise<null | LiveGame> {
  const url = `${SERVER_URL}persistantLiveGame`;
  try {
    const data: any = await ky.get(url).json();
    return data as LiveGame;
  } catch (e) {
    console.log(e);
    return null;
  }
}

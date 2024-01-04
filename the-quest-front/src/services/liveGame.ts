import { LiveGame } from "@/models/LiveGame";
import { RiotId } from "@/models/RiotId";
import ky from "ky";
const SERVER_URL = import.meta.env.VITE_APP_BACKEND_URL;

export async function getLiveGameByRiotId(
  riotId: RiotId,
  queueOption?: string,
  periodOption?: string
): Promise<null | LiveGame> {
  console.log("DJ called 1");
  const queueOptSegment =
    queueOption && queueOption !== "" ? `/${queueOption}` : "";
  const periodOptSegment =
    periodOption && periodOption !== "" ? `/${periodOption}` : "";
  const url = `${SERVER_URL}liveGameByRiotId/${riotId.gameName}/${riotId.tagLine}${queueOptSegment}${periodOptSegment}`;
  try {
    const data: any = await ky.get(url).json();
    console.log("DJ called 2");
    return data as LiveGame;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getPersistantLiveGame(): Promise<null | LiveGame> {
  const url = `${SERVER_URL}persistantLiveGame`;
  console.log(url);
  try {
    const data: any = await ky.get(url).json();
    console.log(data);
    return data as LiveGame;
  } catch (e) {
    console.log(e);
    return null;
  }
}

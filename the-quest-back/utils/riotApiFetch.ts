import got from "got";
import dotenv from "dotenv";

dotenv.config();
const LOL_API_KEY = process.env.RIOT_API_KEY;

export async function requestLolAPI(path: string): Promise<any | null> {
  const region = "euw1";
  const url = `https://${region}.api.riotgames.com${path}`;
  const headers = {
    "X-Riot-Token": LOL_API_KEY,
  };
  try {
    return await got.get(url, { headers }).json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function requestRiotAPI(path: string): Promise<any | null> {
  const url = `https://europe.api.riotgames.com${path}`;
  const headers = {
    "X-Riot-Token": LOL_API_KEY,
  };
  try {
    return await got.get(url, { headers }).json();
  } catch (e) {
    console.log(e);
    return null;
  }
}

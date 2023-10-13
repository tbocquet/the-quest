import got from "got";

export async function getChampionAmount(): Promise<number> {
  const url =
    "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";
  try {
    const data: any = await got.get(url).json();
    return data.length - 1;
  } catch (e) {
    console.log(e);
    return 1;
  }
}

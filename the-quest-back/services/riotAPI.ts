import dotenv from "dotenv";
import { requestLolAPI, requestRiotAPI } from "../utils/riotApiFetch";
import {
  BannedChampion,
  CurrentGameParticipant,
  LolAPIAccountData,
  LolAPIChampionMastery,
  LolAPICurrentGameInfo,
  LolAPISummonerData,
  LolAPISummonerLeague,
  Perks,
} from "../models/lolApi-types";

dotenv.config();
const KEY = process.env.RIOT_API_KEY;

export async function getSummonerDataById(
  summmonerId: string
): Promise<LolAPISummonerData | null> {
  const encodedSumName = encodeURI(summmonerId);
  const data = await requestLolAPI(
    `/lol/summoner/v4/summoners/${encodedSumName}`
  );
  if (data === null) return null;
  const res = {
    id: data.id,
    accountId: data.accountId,
    puuid: data.puuid,
    name: data.name,
    profileIconId: data.profileIconId,
    summonerLevel: data.summonerLevel,
    revisionDate: data.revisionDate,
  };
  return res as LolAPISummonerData;
}

export async function getSummonerDataByName(
  name: string
): Promise<LolAPISummonerData | null> {
  const encodedSumName = encodeURI(name);
  const data = await requestLolAPI(
    `/lol/summoner/v4/summoners/by-name/${encodedSumName}`
  );
  if (data === null) return null;
  const res = {
    id: data.id,
    accountId: data.accountId,
    puuid: data.puuid,
    name: data.name,
    profileIconId: data.profileIconId,
    summonerLevel: data.summonerLevel,
    revisionDate: data.revisionDate,
  };
  return res as LolAPISummonerData;
}

export async function getSummonerDataByPuuid(
  puuid: string
): Promise<LolAPISummonerData | null> {
  const encodedPuuid = encodeURI(puuid);
  const data = await requestLolAPI(
    `/lol/summoner/v4/summoners/by-puuid/${encodedPuuid}`
  );
  if (data === null) return null;

  return data as LolAPISummonerData;
}

export async function getSummonerAccountByRiotId(
  gameName: string,
  tagLine: string
): Promise<LolAPIAccountData | null> {
  const encodedGameName = encodeURI(gameName);
  const encodedTagLine = encodeURI(tagLine);
  const data = await requestRiotAPI(
    `/riot/account/v1/accounts/by-riot-id/${encodedGameName}/${encodedTagLine}`
  );
  if (data === null) return null;
  return data as LolAPIAccountData;
}

export async function getSummonerAccountByPuuid(
  puuid: string
): Promise<LolAPIAccountData | null> {
  const encodePuuid = encodeURI(puuid);

  const data = await requestRiotAPI(
    `/riot/account/v1/accounts/by-puuid/${encodePuuid}`
  );
  if (data === null) return null;
  return data as LolAPIAccountData;
}

export async function getSummonerChampionsMasteries(
  summonerId: string
): Promise<LolAPIChampionMastery[] | null> {
  const data = await requestLolAPI(
    `/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`
  );
  if (data === null) return null;
  const res = data.map((elt: any) => ({
    puuid: elt.puuid,
    championId: elt.championId,
    championLevel: elt.championLevel,
    championPoints: elt.championPoints,
    lastPlayTime: elt.lastPlayTime,
    championPointsSinceLastLevel: elt.championPointsSinceLastLevel,
    championPointsUntilNextLevel: elt.championPointsUntilNextLevel,
    chestGranted: elt.chestGranted,
    tokensEarned: elt.tokensEarned,
    summonerId: elt.summonerId,
  }));
  return res as LolAPIChampionMastery[];
}

export async function getSummonerChampionsMasteriesByPuuid(
  puuid: string
): Promise<LolAPIChampionMastery[] | null> {
  const data = await requestLolAPI(
    `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`
  );
  if (data === null) return null;

  return data as LolAPIChampionMastery[];
}

export async function getSummonerLeagues(
  summonerId: string
): Promise<LolAPISummonerLeague[] | null> {
  const data = await requestLolAPI(
    `/lol/league/v4/entries/by-summoner/${summonerId}`
  );
  if (data === null) return null;
  const res = data.map((elt: any) => ({
    leagueId: elt.leagueId,
    summonerId: elt.summonerId,
    summonerName: elt.summonerName,
    queueType: elt.queueType,
    tier: elt.tier,
    rank: elt.rank,
    leaguePoints: elt.leaguePoints,
    wins: elt.wins,
    losses: elt.losses,
    hotStreak: elt.hotStreak,
    veteran: elt.veteran,
    freshBlood: elt.freshBlood,
    inactive: elt.inactive,
    miniSeries: elt.miniSeries,
  }));
  return res as LolAPISummonerLeague[];
}

export async function getCurrentGameInfo(
  summonerId: string
): Promise<LolAPICurrentGameInfo | null> {
  const data = await requestLolAPI(
    `/lol/spectator/v4/active-games/by-summoner/${summonerId}`
  );
  if (data === null) return null;
  const res = {
    gameId: data.gameId,
    gameType: data.gameType,
    gameStartTime: data.gameStartTime,
    mapId: data.mapId,
    gameLength: data.gameLength,
    platformId: data.platformId,
    gameMode: data.gameMode,
    bannedChampions: data.bannedChampions.map((elt: any) => ({
      pickTurn: elt.pickTurn,
      championId: elt.championId,
      teamId: elt.teamId,
    })) as BannedChampion[],
    gameQueueConfigId: data.gameQueueConfigId,
    observers: data.observers,
    participants: data.participants.map((elt: any) => ({
      championId: elt.championId,
      perks: elt.perks as Perks,
      profileIconId: elt.profileIconId,
      bot: elt.bot,
      teamId: elt.teamId,
      summonerName: elt.summonerName,
      summonerId: elt.summonerId,
      spell1Id: elt.spell1Id,
      spell2Id: elt.spell2Id,
    })) as CurrentGameParticipant[],
  };
  return res as LolAPICurrentGameInfo;
}

// export async function getSummonerDataById(name: string) {
//   const encodedSumName = encodeURI(name);

//   var riotRequest = new RiotLolApi(KEY);
//   const res = await riotRequest.request(
//     "euw1",
//     "summoner",
//     `/lol/summoner/v4/summoners/by-name/${encodedSumName}`,
//     function (err: any, data: any) {
//       console.log(data);
//       const ranksRow = data.ranks;
//       console.log(ranksRow);
//       const ranks = ranksRow
//         .map((elt: any) => {
//           const queueType =
//             elt.queueType === "RANKED_SOLO_5x5"
//               ? "solo"
//               : elt.queueType === "RANKED_FLEX_SR"
//               ? "flex"
//               : ("normal" as QueueType);

//           const rank =
//             elt.tier !== null ? (elt.tier.toLowerCase() as Rank) : null;

//           const division =
//             data.rank != null &&
//             rank !== null &&
//             rank !== "challenger" &&
//             rank !== "master" &&
//             rank !== "grandmaster"
//               ? romanToNumber(data.rank)
//               : null;
//           const wins = data.wins as number;
//           const losses = data.losses as number;

//           if (!queueType || !rank || !wins || !losses) return null;
//           return { queueType, rank, division, wins, losses } as SummonerRank;
//         })
//         .filter((elt: SummonerRank | null) => elt != null);

//       const summonerData = {
//         id: data.id,
//         name: data.name,
//         profileIconId: data.profileIconId,
//         summonerLevel: data.summonerLevel,
//         ranks,
//       };

//       return summonerData as SummonerData;
//     }
//   );
//   console.log(res);
// }

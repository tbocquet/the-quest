import { BannedChampion, LolAPISummonerLeague, Perks } from "./lolApi-types";
import { PoroSummoner } from "./porofessor-types";

export type LiveGame = {
  gameId: number;
  gameType: string;
  gameStartTime: number;
  mapId: number;
  gameLength: number;
  platformId: string;
  gameMode: string;
  bannedChampions: BannedChampion[];
  gameQueueConfigId: number;
  participants: LiveGameParticipant[];
};

export type LiveGameParticipant = {
  //RiotId
  gameName: string;
  tagLine: string;
  puuid: string;

  championId: number;
  perks: Perks;
  profileIconId: number;
  bot: boolean;
  teamId: number;
  summonerName: string;
  summonerId: string;
  spell1Id: number;
  spell2Id: number;

  porofessorStats: PoroSummoner | null;

  masteries: MasteriesInfos | null;
  leagues: LolAPISummonerLeague[] | null;
};

export type MasteriesInfos = {
  progression: number;
  championProgression: number;
  totalPoint: number;
  championPoint: number;
  championLevel: number;
  championToken: number;
  chestGranded: boolean;
};

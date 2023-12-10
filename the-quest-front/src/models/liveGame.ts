import { PoroSummoner } from "@/models/porofessor";

export type LiveGame = {
  gameId: string;
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
  puuid: string;
  gameName: string;
  tagLine: string;
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

export type BannedChampion = {
  pickTurn: number;
  championId: number;
  teamId: number;
};

export type Perks = {
  perkIds: number[]; // IDs of the perks/runes assigned.
  perkStyle: number; // Primary runes path
  perkSubStyle: number; // Secondary runes path
};

export type LolAPISummonerLeague = {
  leagueId: string;
  summonerId: string;
  summonerName: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
  miniSeries: MiniSeriesDTO;
};

export type MiniSeriesDTO = {
  losses: number;
  progress: number;
  target: number;
  wins: number;
};

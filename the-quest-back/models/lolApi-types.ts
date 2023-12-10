export type LolAPIAccountData = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export type LolAPISummonerData = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};

export type LolAPIChampionMastery = {
  puuid: string;
  championId: number;
  championLevel: number;
  championPoints: number;
  lastPlayTime: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
  summonerId: string;
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

export type LolAPICurrentGameInfo = {
  gameId: number;
  gameType: string;
  gameStartTime: number;
  mapId: number;
  gameLength: number;
  platformId: string;
  gameMode: string;
  bannedChampions: BannedChampion[];
  gameQueueConfigId: number;
  observers: string;
  participants: CurrentGameParticipant[];
};

export type BannedChampion = {
  pickTurn: number;
  championId: number;
  teamId: number;
};

export type CurrentGameParticipant = {
  championId: number;
  perks: Perks;
  profileIconId: number;
  bot: boolean;
  teamId: number;
  summonerName: string;
  summonerId: string;
  spell1Id: number;
  spell2Id: number;
  // gameCustomizationObjects	List[GameCustomizationObject]
};

export type Perks = {
  perksIds: number[]; // IDs of the perks/runes assigned.
  perkStyle: number; // Primary runes path
  perkSubStyle: number; // Secondary runes path
};

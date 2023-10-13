export type PoroLiveGameData = {
  players: PoroSummoner[];
  teamsTags: TeamTags[];
};

export type PoroSummoner = {
  name: string;
  id: string;
  level: number;
  rankedStats: PoroRankedStats | null;
  previousSeasonRankedStats: PoroPreviousSeasonRankedStats | null;
  championStats: PoroChampionStats | null;
  role: SummonerRole;
  tags: PoroTag[];
};

export type PoroRankedStats = {
  division: number | null;
  gameAmount: number;
  lp: number | null;
  rank: Rank | null;
  seasonId: string;
  winrate: number | null;
};

export type PoroPreviousSeasonRankedStats = {
  division: number | null;
  rank: Rank;
  seasonId: string;
};

export type PoroChampionStats = {
  name: string;
  winrate: number | null;
  gameAmount: number;
  kills: number | null;
  deaths: number | null;
  assists: number | null;
};

export type PoroTag = {
  title: string;
  value: TagNiceness;
  details: string | null;
};

export type SummonerRole = {
  role: Role;
  mainRole: Role[];
};

export type TagNiceness = "good" | "bad" | "neutral";

export type TeamTags = PoroTag[];

export type Rank =
  | "fer"
  | "bronze"
  | "silver"
  | "or"
  | "platine"
  | "emerald"
  | "diamon"
  | "master"
  | "grandmaster"
  | "challenger";

export type Role = "adc | jungler | mid | support | top";

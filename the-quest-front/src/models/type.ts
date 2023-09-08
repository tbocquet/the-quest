export type Champion = {
  id: string;
  key: string;
  name: string;
  url: string;
  lane: string[];
  tags: string[];
  region: string[];
};

export type Mastery = {
  championId: number;
  championLevel: number;
  championPoints: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
};

export type ChampionMastery = {
  id: string; //Nom du champion
  championKey: number; //Clef du champion dans l'API riot
  level: number;
  points: number;
  pointsSinceLastLevel: number;
  pointsUntilNextLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
  name: string;
  lane: string[];
  tags: string[];
  region: string[];
};

/*----------------Summoner Data-------------------*/

/*Données d'une queue particulière*/
type RankedQData = {
  queueType: string;
  tier: number;
  rank: string;
  wins: number;
  losses: number;
};

/*Données d'un summoner*/
export type SummonerData = {
  id: string;
  name: string;
  profileIconId: number;
  summonerLevel: number;
  ranks: RankedQData[];
};

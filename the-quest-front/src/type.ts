export type Champion = {
  id: string;
  key: string;
  name: string;
  url: string;
  tags: string[];
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
  id: number;
  level: number;
  points: number;
  pointsSinceLastLevel: number;
  pointsUntilNextLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
  name: string;
  url: string;
  tags: string[];
};

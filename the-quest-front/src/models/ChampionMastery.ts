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

export type Mastery = {
  championId: number;
  championLevel: number;
  championPoints: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  chestGranted: boolean;
  tokensEarned: number;
};

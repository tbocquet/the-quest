/*----------------Summoner Data-------------------*/

/*Données d'un summoner*/
export type SummonerData = {
  id: string;
  name: string;
  profileIconId: number;
  summonerLevel: number;
  ranks: RankedQData[];
};

/*Données d'une queue particulière*/
type RankedQData = {
  queueType: string;
  tier: number;
  rank: string;
  wins: number;
  losses: number;
};

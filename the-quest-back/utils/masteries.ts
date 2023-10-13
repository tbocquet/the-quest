import { LolAPIChampionMastery } from "../models/lolApi-types";

export function getTheQuestProgression(
  masteries: LolAPIChampionMastery[],
  totalChamp: number
) {
  const res = masteries.reduce(
    (previousValue, champ: LolAPIChampionMastery) =>
      getChampionProgression(champ) + previousValue,
    0
  );
  return Math.round((res * 100) / totalChamp) / 100;
}

export function getChampionProgression(champion: LolAPIChampionMastery) {
  switch (champion.championLevel) {
    case 7:
      return 100;
    case 6:
      //Mastery 6 : 67% + 3 token (10%) = 97% | 97% + achat mastery (3%) = 100%
      return 68 + champion.tokensEarned * 10;
    case 5:
      //Mastery 5 : 50% + 2 token (7%) = 64% | 64% + achat mastery (3%) = 67%
      return 50 + champion.tokensEarned * 7;
    default:
      //Nombre de point requis pour la mastery 5 = 1800 + 4200 + 6600 + 9000
      return (champion.championPoints / 21600) * 50;
  }
}

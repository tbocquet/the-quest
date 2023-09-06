/*Fonctions permettant le calcul de l'avancement de la quête*/

import { ChampionMastery, Mastery } from "../type";

export function getChampionProgression(champ: ChampionMastery) {
  switch (champ.level) {
    case 7:
      return 100;
    case 6:
      //Mastery 6 : 67% + 3 token (10%) = 97% | 97% + achat mastery (3%) = 100%
      return 68 + champ.tokensEarned * 10;
    case 5:
      //Mastery 5 : 50% + 2 token (7%) = 64% | 64% + achat mastery (3%) = 67%
      return 50 + champ.tokensEarned * 7;
    default:
      //Nombre de point requis pour la mastery 5 = 1800 + 4200 + 6600 + 9000
      return (champ.points / 21600) * 50;
  }
}

export function countChampions(masteries: ChampionMastery[]): number {
  return masteries.length;
}

export function countMastery5(masteries: ChampionMastery[]): number {
  return masteries.reduce(
    (previousValue, champ: ChampionMastery) =>
      champ.level === 5 ? previousValue + 1 : previousValue,
    0
  );
}

export function countMastery6(masteries: ChampionMastery[]): number {
  return masteries.reduce(
    (previousValue, champ: ChampionMastery) =>
      champ.level === 6 ? previousValue + 1 : previousValue,
    0
  );
}
export function countMastery7(masteries: ChampionMastery[]): number {
  return masteries.reduce(
    (previousValue, champ: ChampionMastery) =>
      champ.level === 7 ? previousValue + 1 : previousValue,
    0
  );
}

export function getQuestProgression(masteries: ChampionMastery[]): number {
  const res = masteries.reduce(
    (previousValue, champ: ChampionMastery) =>
      getChampionProgression(champ) + previousValue,
    0
  );
  return Math.round((res * 100) / masteries.length) / 100;
}

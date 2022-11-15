/*Fonctions permettant le calcul de l'avancement de la quête*/

import { Mastery } from "../type";

export function championProgression(champ: Mastery) {
  switch (champ.championLevel) {
    case 7:
      return 100;
    case 6:
      return 64 + champ.tokensEarned * 11;
    case 5:
      return 50 + champ.tokensEarned * 7;
    default:
      return champ.championPoints / 21600;
  }
}

export function countChampions(masteries: Mastery[]): number {
  return masteries.length;
}

export function countMastery5(masteries: Mastery[]): number {
  return masteries.reduce(
    (previousValue, champ: Mastery) =>
      champ.championLevel === 5 ? previousValue + 1 : previousValue,
    0
  );
}

export function countMastery6(masteries: Mastery[]): number {
  return masteries.reduce(
    (previousValue, champ: Mastery) =>
      champ.championLevel === 6 ? previousValue + 1 : previousValue,
    0
  );
}
export function countMastery7(masteries: Mastery[]): number {
  return masteries.reduce(
    (previousValue, champ: Mastery) =>
      champ.championLevel === 7 ? previousValue + 1 : previousValue,
    0
  );
}

export function getQuestProgression(masteries: Mastery[]): number {
  const res = masteries.reduce(
    (previousValue, champ: Mastery) =>
      championProgression(champ) + previousValue,
    0
  );
  return Math.round((res * 100) / masteries.length) / 100;
}

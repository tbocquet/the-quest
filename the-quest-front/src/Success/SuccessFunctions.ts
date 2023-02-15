import success from "./Success.json";
import allChampions from "../champion.json";
import { ChampionMastery, Champion } from "../type";
import { Success } from "./type";

//Renvoit les success généraux
export function getGeneralSuccess(sumMasteries: ChampionMastery[]): Success[] {
  const mySuccess: unknown = success.general.map((obj) => ({
    title: obj.title,
    url: obj.url,
    description: obj.description,
    clause: obj.clause,
    championsList: null,
    owned: isEnoughAmountOfMastery7(obj.type, obj.requireAmount, sumMasteries),
  }));
  return mySuccess as Success[];
}

//Regarde s'il y a assez de mastery du type spécifié (ou suppérieur) dans les sumsMasteries
function isEnoughAmountOfMastery7(
  type: number,
  amount: number,
  sumMasteries: ChampionMastery[]
): boolean {
  const total = sumMasteries.reduce(
    (acc, sumMastery) => (sumMastery.level >= type ? acc + 1 : acc),
    0
  );
  return total >= amount;
}

//Renvoit les success en rapport avec les roles
export function getRoleSuccess(sumMasteries: ChampionMastery[]): Success[] {
  const mySuccess: unknown = success.role.map((obj) => ({
    title: obj.title,
    url: obj.url,
    description: obj.description,
    clause: obj.clause,
    championsList: null,
    owned: isChampionsInListMastery7(
      sumMasteries,
      getAllChampionIdForRole(obj.role)
    ),
  }));
  return mySuccess as Success[];
}

function getAllChampionIdForRole(role: string): string[] {
  const championsList: Champion[] = allChampions;
  return championsList.reduce((idList: string[], champion: Champion) => {
    const tags = champion.tags;
    if (tags.includes(role)) {
      return [...idList, champion.id];
    } else {
      return idList;
    }
  }, []);
}

//Renvoit les success de type Rigolo
export function getRigoloSuccess(sumMasteries: ChampionMastery[]): Success[] {
  const mySuccess: unknown = success.rigolo.map((obj) => ({
    title: obj.title,
    url: obj.url,
    clause: null,
    description: obj.description,
    championsList: obj.championsList,
    owned: isChampionsInListMastery7(sumMasteries, obj.championsList),
    music: obj.music ? obj.music : undefined,
  }));
  return mySuccess as Success[];
}

//Renvoit true si les champions de la liste championIdList sont mastery 7
function isChampionsInListMastery7(
  masteries: ChampionMastery[],
  championIdList: string[]
): boolean {
  const res = championIdList.reduce((acc, champId) => {
    if (acc) {
      const mastery = masteries.find((elt) => elt.id === champId);
      return acc && mastery !== undefined && mastery.level === 7;
    } else return false;
  }, true);

  return res;
}

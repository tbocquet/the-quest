/*Icons*/

import { getPerk } from "@/utils/perks";
import { getSummonerSpell as getSumSpell } from "@/utils/summonerSpells";

export function getLaneIcon(id: string): string {
  return "/images/icons/lanes/" + id.toLowerCase() + ".png";
}

export function getRoleIcon(id: string): string {
  return "/images/icons/roles/" + id + ".png";
}

export function getMasteryIcon(id: number): string {
  return "/images/icons/masteries/mastery" + id + "_icon.png";
}

export function getTokenIcon(id: number): string {
  return "/images/icons/tokens/token_mastery_" + id + ".png";
}
export function getTokenIcon2(id: number): string {
  return "/images/icons/tokens/token" + id + ".png";
}

export function getRegionIcon(id: string): string {
  if (id === "Les Îles Obscures") {
    return "/images/icons/regions/iles_obscures.png";
  }
  return "/images/icons/regions/" + id + ".png";
}

export function getChestIcon(): string {
  return "/images/icons/others/chest_icon2.png";
}

/*Champions*/
export function getChampionTile(id: string): string {
  return "/images/champions/tile/" + id + "_0.jpg";
}

export function getChampionSmallTile(id: string): string {
  return "/images/champions/tile/" + id + ".png";
}

export function getChampionCentered(id: string): string {
  return "/images/champions/centered/" + id + "_0.jpg";
}

/*Summoner icons*/

export function getCDragonSummonerIcon(id: number) {
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${id}.jpg`;
}

export function getSummonerDefaultProfileIcon(): string {
  return "/images/blitz_question.png";
}

/*Success*/
export function getSuccessIcon(id: string): string {
  return "/images/success/" + id;
}

export function getSuccessNotOwnedIcon(): string {
  return "/images/success/notOwned.png";
}

/*Mastery Assets*/
/*Success*/
export function getMasteryOverlay(id: number): string {
  if (id < 4) return "/images/masteries-assets/cadreM3.png";
  else {
    return "/images/masteries-assets/cadreM" + id + ".png";
  }
}

export function getMasteryToken(id: number, isOwned: boolean): string {
  if (isOwned) return "/images/masteries-assets/token" + id + "oui.png";
  else return "/images/masteries-assets/token" + id + "non.png";
}

export function getChestIcon2(isOwned: boolean): string {
  if (isOwned) return "/images/masteries-assets/coffreOui.png";
  else return "/images/masteries-assets/coffreNon.png";
}

// Lee prediction
export function leePredictionImage(): string {
  return "/images/lee-prediction.png";
}

export function getRankedIcon(rank: string) {
  const url =
    "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/";

  return `${url}${rank.toLowerCase()}.png`;
}

export function getUnrankedIcon() {
  return "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/unranked.png";
}

export function getChampionTileById(id: number) {
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-tiles/${id}/${id}000.jpg`;
  // return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${id}.png`;
}

export function getChampionSplashesById(id: number) {
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${id}/${id}000.jpg`;
}

export function getSummonerSpell(id: number) {
  return getSumSpell(id).iconPath;
}

export function getPerkSrc(id: number) {
  return getPerk(id).icon;
}

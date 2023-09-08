/*Icons*/

export function getLaneIcon(id: string): string {
  return "/images/icons/lanes/" + id + ".png";
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
  if(id==='Les Îles Obscures'){
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
export function getSummonerIcon(id: number): string {
  return "/images/profile-icons/" + id + ".png";
}

export function getSummonerDefaultProfileIcon(): string {
  return "/images/profile-icons/default.png";
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
export function leePredictionImage():string{
  return "/images/lee-prediction.png";
}

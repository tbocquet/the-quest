/*Icons*/

export function getLaneIcon(id: string): string {
  return "/image/icon/lane/" + id + ".png";
}

export function getRoleIcon(id: string): string {
  return "/image/icon/role/" + id + ".png";
}

export function getMasteryIcon(id: number): string {
  return "/image/icon/mastery/mastery" + id + "_icon.png";
}

export function getTokenIcon(id: number): string {
  return "/image/icon/token/token_mastery_" + id + ".png";
}

export function getChestIcon(): string {
  return "/image/icon/other/chest_icon.png";
}

/*Champions*/
export function getChampionTile(id: string): string {
  return "/image/champion/tile/" + id + "_0.jpg";
}

export function getChampionCentered(id: string): string {
  return "/image/champion/centered/" + id + "_0.jpg";
}

/*Summoner icons*/
export function getSummonerIcon(id: number): string {
  return "/image/profileIcon/" + id + ".png";
}

export function getSummonerDefaultProfileIcon(): string {
  return "/image/profileIcon/default.png";
}

/*Success*/
export function getSuccessIcon(id: string): string {
  return "/image/success/" + id;
}

export function getSuccessNotOwnedIcon(): string {
  return "/image/success/notOwned.png";
}

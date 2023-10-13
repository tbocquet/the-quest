import summonerSpell from "@/assets/summoner-spells.json";

type SummonerSpell = {
  id: number;
  name: string;
  description: string;
  summonerLevel: number;
  cooldown: number;
  iconPath: string;
};

export function getSummonerSpell(id: number) {
  const res = summonerSpell.find((elt) => elt.id === id);
  if (res !== undefined) return res;
  return {
    id: 0,
    name: "",
    description: "",
    summonerLevel: 0,
    cooldown: 0,
    iconPath: "",
  } as SummonerSpell;
}

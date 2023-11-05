export type ChampionDetails = {
  id: string;
  key: string;
  name: string;
  title: string;

  lore: string;
  allytips: string;
  enemytips: string;

  stats: Stats;
  passive: Spell;
  spells: Spell[];

  skins: Skin[];
};

export type Skin = {
  id: string;
  name: string;
};

export type Stats = {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
};
export type Passive = {
  name: string;
  description: string;
  image: SpellImage;
};
export type Spell = {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip: LevelTipType; //Ce qu'améliore l'augmentation de niveau
  maxrank: 5;
  cooldown: number[];
  cost: number[];
  costType: string;
  range: number[];
  image: SpellImage;
};

type LevelTipType = {
  label: string[];
  effect: string[];
};

type SpellImage = {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

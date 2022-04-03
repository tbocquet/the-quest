import * as icon from "./charmsIcon.js";

export type Charm = {
  icon: string;
  title: string;
  description: string;
};

export type Usercharm = {
  userId: string;
  charmsList: Charm[];
};

//--All Champ
const allMastery7: Charm = {
  icon: icon.allChamp7Icon,
  title: "Dieu des Masteries",
  description:
    "Tu as accompli la quête au péril de ton temps. Tu maitrises désormais à la perfection CHAQUE champion. Bravo à toi !",
};

const allMastery6: Charm = {
  icon: icon.allChamp6Icon,
  title: "Petit Prince des Masteries",
  description:
    "Tu maitrises désormais un peu CHAQUE champion, cependant il te reste encore beaucoup à parcourir pour accomplir l'ultime quête. Ton effort ce doit tout de même d'être salué. Salut !",
};

const allMastery5: Charm = {
  icon: icon.allChamp5Icon,
  title: "Prince de la Bonne Volonté",
  description:
    "Ta détermination t'a porté jusqu'ici : Félicitation ! Il s'agit maintenant de faire tes preuves et de montrer au monde que ton niveau de maitrise n'est pas juste la résultante d'un spamming massif du jeu. Bonne chance !",
};

//--Palier Mastery 7

const _150Mastery7: Charm = {
  icon: icon._150Champ7Icon,
  title: "Roi des Masteries",
  description: "",
};

const _125Mastery7: Charm = {
  icon: icon._125Champ7Icon,
  title: "Reine des Masteries",
  description: "",
};

const _100Mastery7: Charm = {
  icon: icon._100Champ7Icon,
  title: "Roi des Masteries",
  description: "",
};

const _75Mastery7: Charm = {
  icon: icon._75Champ7Icon,
  title: "Roi des Masteries",
  description: "",
};

const _50Mastery7: Charm = {
  icon: icon._50Champ7Icon,
  title: "Roi des Masteries",
  description: "",
};

const _25Mastery7: Charm = {
  icon: icon._25Champ7Icon,
  title: "Roi des Masteries",
  description: "",
};

const _10Mastery7: Charm = {
  icon: icon._10Champ7Icon,
  title: "Roi des Masteries",
  description: "",
};

const _1Mastery7: Charm = {
  icon: icon._1Champ7Icon,
  title: "Roi des Masteries",
  description: "",
};

const gangPlankMastery7: Charm = {
  icon: icon.gangPlank7Icon,
  title: "Roi des Masteries",
  description: "",
};
const aurelionMastery7: Charm = {
  icon: icon.aurelion7Icon,
  title: "Roi des Masteries",
  description: "",
};

export const AllCharms: Charm[] = [
  allMastery7,
  allMastery6,
  allMastery5,
  _150Mastery7,
  _125Mastery7,
  _100Mastery7,
  _75Mastery7,
  _50Mastery7,
  _25Mastery7,
  _10Mastery7,
  _1Mastery7,

  gangPlankMastery7,
  aurelionMastery7,
];

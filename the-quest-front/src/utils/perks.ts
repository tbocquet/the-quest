// cdragon url : https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/fr_fr/v1/perks.json
import perksFile from "@/assets/runesReforged.json";
import statsModesFile from "@/assets/runesStatsModes.json";

type Perk = {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
};

type PerkStyle = {
  id: number;
  key: string;
  icon: string;
  name: string;
};

const perksList = perksFile.reduce((acc: Perk[], style) => {
  const slots = style.slots;

  const runesDuSlot: Perk[] = slots.reduce((runeAcc: Perk[], slot) => {
    const runes = slot.runes.map(
      (rune) =>
        ({
          id: rune.id,
          key: rune.name,
          icon: rune.icon,
          name: rune.name,
          shortDesc: rune.shortDesc,
          longDesc: rune.longDesc,
        } as Perk)
    );

    return [...runes, ...runeAcc];
  }, []);

  return [...acc, ...runesDuSlot];
}, []);

const statModes: Perk[] = statsModesFile.map(
  (elt) =>
    ({
      id: elt.id,
      key: elt.name,
      icon: elt.iconPath,
      name: elt.name,
      shortDesc: elt.shortDesc,
      longDesc: elt.longDesc,
    } as Perk)
);

export const allPerks = [...perksList, ...statModes];
export const allPerksStyles = perksFile.reduce(
  (acc: PerkStyle[], style) => [...acc, ...style.slots] as PerkStyle[],
  []
);

export function getPerk(id: number): Perk {
  const res = allPerks.find((elt) => elt.id === id);
  if (res) return res;
  return {
    id: id,
    key: "unknow",
    icon: "",
    name: "unknow",
    shortDesc: "bug",
    longDesc: "bug",
  };
}

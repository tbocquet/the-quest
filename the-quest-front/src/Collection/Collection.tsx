import { Mastery, Champion, ChampionMastery } from "../type";
import { CollectionElement } from "./CollectionElement";
import "./Styles/Collection.scss";
import React, { useEffect, useState } from "react";
import { MasteryCheckBox } from "./MasteryCheckBox";
import { SearchBar } from "./SearchBar";
import { RoleCheckBox } from "./RoleCheckBox";
import { ChestCheckBox } from "./ChestCheckBox";
import { SelectFilter } from "./SelectFilter";

type Props = {
  masteries: Mastery[];
  champions: Champion[];
};

export function Collection({ champions, masteries }: Props) {
  const [RoleFilter, setRoleFilter] = useState<string[]>([]);
  const [MasteryFilter, setMasteryFilter] = useState<number[]>([]);
  const [championFilter, setChampionFilter] = useState<string>("");
  const [chestFilter, setChestFilter] = useState<boolean>(false);
  const [sortingOption, setSortingOption] = useState<string>("");
  const [championMasteries, setChampionMasteries] = useState<ChampionMastery[]>(
    []
  );
  //useEffect(() => console.log(sortingOption), [sortingOption]);

  //Fonction de tri
  function compareMastery(a: ChampionMastery, b: ChampionMastery) {
    return b.level - a.level;
  }
  function compareMasteryPoint(a: ChampionMastery, b: ChampionMastery) {
    return b.points - a.points;
  }
  function compareChampionsName(a: ChampionMastery, b: ChampionMastery) {
    return a.name.localeCompare(b.name);
  }

  useEffect(() => {
    //Agrégation des données
    const T: ChampionMastery[] = masteries.map((mastery) => {
      const champ: Champion | undefined = champions.find(
        (champ) => parseInt(champ.key) === mastery.championId
      );
      const res: ChampionMastery =
        champ !== undefined
          ? {
              id: mastery.championId,
              level: mastery.championLevel,
              points: mastery.championPoints,
              pointsSinceLastLevel: mastery.championPointsSinceLastLevel,
              pointsUntilNextLevel: mastery.championPointsUntilNextLevel,
              chestGranted: mastery.chestGranted,
              tokensEarned: mastery.tokensEarned,
              name: champ.name,
              url: champ.url,
              tags: champ.tags,
            }
          : {
              id: mastery.championId,
              level: mastery.championLevel,
              points: mastery.championPoints,
              pointsSinceLastLevel: mastery.championPointsSinceLastLevel,
              pointsUntilNextLevel: mastery.championPointsUntilNextLevel,
              chestGranted: mastery.chestGranted,
              tokensEarned: mastery.tokensEarned,
              name: "undefined",
              url: "undefined",
              tags: [],
            };
      return res;
    });

    //Tri des données en fonction de sorting Option
    switch (sortingOption) {
      case "Niveau de maîtrise":
        T.sort(compareMastery);
        break;
      case "Points de maîtrise":
        T.sort(compareMasteryPoint);
        break;
      case "Nom de champion":
        T.sort(compareChampionsName);
        break;
      default:
    }
    setChampionMasteries(T);
  }, [champions, masteries, sortingOption]);

  const allMastery = [7, 6, 5, 4, 3, 2, 1, 0];
  const allRole = [
    "Assassin",
    "Colossus",
    "Enchanteur",
    "Fighter",
    "Mage",
    "Marksman",
    "Ninja",
    "Support",
    "Tank",
  ];
  const allSortingOptions = [
    "Points de maîtrise",
    "Niveau de maîtrise",
    "Nom de champion",
  ];

  return (
    <React.Fragment>
      <div className="lq-filter">
        <SearchBar
          search={championFilter}
          setSearch={setChampionFilter}
          suggestions={champions.reduce(
            (prev: string[], champ) => [...prev, champ.name],
            []
          )}
        />
        <div className="sorting-selection">
          <p>Trier par</p>
          <SelectFilter
            values={allSortingOptions}
            setSelected={setSortingOption}
          />
        </div>
        <ul className="mastery-filter-list">
          {allMastery.map((m) => (
            <li key={m}>
              <MasteryCheckBox
                lvl={m}
                isSelected={MasteryFilter.includes(m)}
                onCheckboxChange={() => {
                  MasteryFilter.includes(m)
                    ? setMasteryFilter(MasteryFilter.filter((t) => t !== m))
                    : setMasteryFilter([...MasteryFilter, m]);
                }}
              />
            </li>
          ))}
        </ul>
        <ul className="role-filter-list">
          {allRole.map((tag) => (
            <li key={tag}>
              <RoleCheckBox
                role={tag}
                isSelected={RoleFilter.includes(tag)}
                onCheckboxChange={() => {
                  RoleFilter.includes(tag)
                    ? setRoleFilter(RoleFilter.filter((t) => t !== tag))
                    : setRoleFilter([...RoleFilter, tag]);
                }}
              />
            </li>
          ))}
        </ul>
        <ChestCheckBox
          isSelected={chestFilter}
          onCheckboxChange={() =>
            chestFilter ? setChestFilter(false) : setChestFilter(true)
          }
        />
      </div>
      <div className="lq-collection">
        {championMasteries.map((champMast, index) => {
          const Mfilter = MasteryFilter.length === 0;
          const Rfilter = RoleFilter.length === 0;
          const Cfilter = championFilter === "";
          const ROk = RoleFilter.every((item) => champMast.tags.includes(item));
          const MOk = MasteryFilter.includes(champMast.level);
          const champName = champMast.name.toLocaleLowerCase();
          if (
            (!chestFilter || (chestFilter && !champMast.chestGranted)) &&
            ((Rfilter && Mfilter) ||
              (Rfilter && MOk) ||
              (Mfilter && ROk) ||
              (ROk && MOk)) &&
            (Cfilter || champName.includes(championFilter))
          ) {
            return (
              <CollectionElement key={index} championMastery={champMast} />
            );
          } else {
            return null;
          }
        })}
      </div>
    </React.Fragment>
  );
}

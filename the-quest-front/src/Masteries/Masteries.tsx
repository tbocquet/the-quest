import { ChampionMastery } from "../type";
import { CollectionElement } from "./CollectionElement";
import "./Styles/Masteries.scss";
import React, { useEffect, useState } from "react";
import { MasteryCheckBox } from "./MasteryCheckBox";
import { SearchBar } from "./SearchBar";
import { RoleCheckBox } from "./RoleCheckBox";
import { ChestCheckBox } from "./ChestCheckBox";
import { SelectFilter } from "./SelectFilter";
import { LeePrediction } from "./LeePrediction";
import { LaneCheckBox } from "./LaneCheckBox";

type Props = {
  masteries: ChampionMastery[];
};

export function Masteries({ masteries }: Props) {
  const [LaneFilter, setLaneFilter] = useState<string[]>([]);
  const [RoleFilter, setRoleFilter] = useState<string[]>([]);
  const [MasteryFilter, setMasteryFilter] = useState<number[]>([]);
  const [championFilter, setChampionFilter] = useState<string>("");
  const [chestFilter, setChestFilter] = useState<boolean>(false);
  const [sortingOption, setSortingOption] = useState<string>("");
  const [championMasteries, setChampionMasteries] =
    useState<ChampionMastery[]>(masteries);

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

  //Filtrage et des masteries
  useEffect(() => {
    //Filtrage
    let T: ChampionMastery[] = masteries.reduce(
      (acc: ChampionMastery[], champMast: ChampionMastery) => {
        const Lfilter = LaneFilter.length === 0;
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
          return [...acc, champMast];
        } else {
          return acc;
        }
      },
      []
    );

    //Tri
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
  }, [masteries, sortingOption, MasteryFilter, RoleFilter, championFilter]);

  const allMastery = [7, 6, 5, 4, 3, 2, 1, 0];
  const allRole = [
    "assassin",
    "colosse",
    "enchanteur",
    "fighter",
    "mage",
    "marksman",
    "ninja",
    "support",
    "tank",
  ];
  const allSortingOptions = [
    "Points de maîtrise",
    "Niveau de maîtrise",
    "Nom de champion",
  ];

  const allLane = ["top", "jungle", "mid", "bot", "support"];

  return (
    <React.Fragment>
      <div className="lq-filter">
        <SearchBar
          search={championFilter}
          setSearch={setChampionFilter}
          suggestions={[]}
        />
        <div className="sorting-selection">
          <p>Trier par</p>
          <SelectFilter
            values={allSortingOptions}
            setSelected={setSortingOption}
          />
        </div>

        <ul className="lane-filter-list">
          {allLane.map((l) => (
            <li key={l}>
              <LaneCheckBox
                lane={l}
                isSelected={LaneFilter.includes(l)}
                onCheckboxChange={() => {
                  LaneFilter.includes(l)
                    ? setLaneFilter(LaneFilter.filter((t) => t !== l))
                    : setLaneFilter([...LaneFilter, l]);
                }}
              />
            </li>
          ))}
        </ul>

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
        <LeePrediction masteries={championMasteries} />
      </div>

      <div className="lq-collection">
        {championMasteries.map((champMast, index) => (
          <CollectionElement key={index} championMastery={champMast} />
        ))}
      </div>
    </React.Fragment>
  );
}

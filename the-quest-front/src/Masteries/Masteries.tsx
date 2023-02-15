import { ChampionMastery } from "../type";
import "./Styles/Masteries.scss";
import React, { useEffect, useState } from "react";
import { MasteryCheckBox } from "./MasteryCheckBox";
import { SearchBar } from "./SearchBar";
import { RoleCheckBox } from "./RoleCheckBox";
import { ChestCheckBox } from "./ChestCheckBox";
import { SelectFilter } from "./SelectFilter";
import { LeePrediction } from "./LeePrediction";
import { LaneCheckBox } from "./LaneCheckBox";
import { Mastery } from "./Mastery";
import { RegionCheckBox } from "./RegionCheckBox";

type Props = {
  masteries: ChampionMastery[];
};

export function Masteries({ masteries }: Props) {
  const savedSortingOption = localStorage.getItem("masterySortingOption");
  const savedMasteryFilter = localStorage.getItem("masteryLevelFilter");

  const [LaneFilter, setLaneFilter] = useState<string[]>([]);
  const [RoleFilter, setRoleFilter] = useState<string[]>([]);

  const [MasteryFilter, setMasteryFilter] = useState<number[]>(
    savedMasteryFilter ? JSON.parse(savedMasteryFilter) : []
  );
  const [championFilter, setChampionFilter] = useState<string>("");
  const [chestFilter, setChestFilter] = useState<boolean>(false);

  const [sortingOption, setSortingOption] = useState<string>(
    savedSortingOption ? JSON.parse(savedSortingOption) : ""
  );
  const [regionFilter, setRegionFilter] = useState<string[]>([]);

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

  //Sauvegarde de l'option de tri
  useEffect(() => {
    //console.log("sorting opt : " + sortingOption);
    localStorage.setItem("masterySortingOption", JSON.stringify(sortingOption));
  }, [sortingOption]);

  //Sauvegarde du filtre sur le niveau de maitrise
  useEffect(() => {
    localStorage.setItem("masteryLevelFilter", JSON.stringify(MasteryFilter));
  }, [MasteryFilter]);

  //Filtrage et des masteries
  useEffect(() => {
    //Filtrage
    let T: ChampionMastery[] = masteries.reduce(
      (acc: ChampionMastery[], champMast: ChampionMastery) => {
        /*Le filtre est il actif ?*/
        const Lfilter = LaneFilter.length !== 0;
        const Mfilter = MasteryFilter.length !== 0;
        const Rfilter = RoleFilter.length !== 0;
        const Cfilter = championFilter !== "";
        const REfilter = regionFilter.length !== 0;

        /*L'élément correspond t'il aux filtres ?*/
        const LOK = champMast.lane.some((lane) => LaneFilter.includes(lane)); //L'element contient t'il au moins une des lanes selectionnées
        const ROk = RoleFilter.every((item) => champMast.tags.includes(item));
        const MOk = MasteryFilter.includes(champMast.level);
        const REOK = regionFilter.some((region) =>
          champMast.region.includes(region)
        );
        const champName = champMast.name.toLocaleLowerCase();

        //L'élément correspond t'il à tous les filtres actif ?
        if (
          (!Cfilter || (Cfilter && champName.includes(championFilter))) && //Ok with championSearchFilter
          (!chestFilter || (chestFilter && !champMast.chestGranted)) && //Ok with chestFilter
          (!Lfilter || (Lfilter && LOK)) && //Ok with laneFilter
          (!Mfilter || (Mfilter && MOk)) && //Ok with masteryFilter
          (!Rfilter || (Rfilter && ROk)) && //ok with roleFilter
          (!REfilter || (REfilter && REOK))
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
  }, [
    masteries,
    sortingOption,
    MasteryFilter,
    RoleFilter,
    championFilter,
    LaneFilter,
    chestFilter,
    regionFilter,
  ]);

  const allLane = ["top", "jungle", "mid", "adc", "support"];
  const allMastery = [7, 6, 5, 4, 3, 2, 1, 0];
  const allRole = [
    "assassin",
    "colosse",
    "enchanteur",
    "combattant",
    "mage",
    "tireur",
    "ninja",
    "support",
    "tank",
  ];
  const allSortingOptions = [
    "Points de maîtrise",
    "Niveau de maîtrise",
    "Nom de champion",
  ];
  const allRegions = [
    "Bandle",
    "Bilgewater",
    "Demacia",
    "Freljord",
    "Ionia",
    "Ixtal",
    "Le Néant",
    "Les Îles Obscures",
    "Noxus",
    "Piltover",
    "Shurima",
    "Targon",
    "Zaun",
  ];

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
            current={sortingOption}
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

        <ul className="region-filter-list">
          {allRegions.map((tag) => (
            <li key={tag}>
              <RegionCheckBox
                region={tag}
                isSelected={regionFilter.includes(tag)}
                onCheckboxChange={() => {
                  regionFilter.includes(tag)
                    ? setRegionFilter(regionFilter.filter((t) => t !== tag))
                    : setRegionFilter([...regionFilter, tag]);
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
          // <CollectionElement key={index} championMastery={champMast} />
          <Mastery key={index} championMastery={champMast} />
        ))}
      </div>
    </React.Fragment>
  );
}

//Section contenant les differents filtres applicables aux masteries

import { MasteryCheckBox } from "./MasteryCheckBox";
import { SearchBar } from "./SearchBar";
import { RoleCheckBox } from "./RoleCheckBox";
import { ChestCheckBox } from "./ChestCheckBox";
import { SelectFilter } from "./SelectFilter";
import { LeePrediction } from "./LeePrediction";
import { LaneCheckBox } from "./LaneCheckBox";
import { RegionCheckBox } from "./RegionCheckBox";
import { useMasteriesFilters } from "@/context/MasteriesFilterContext";

export function FiltersSection() {
  const fContext = useMasteriesFilters();

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
    <>
      <div className="lq-filter">
        <SearchBar
          search={fContext.championFilter}
          setSearch={fContext.setChampionFilter}
          suggestions={[]}
        />
        <div className="sorting-selection">
          <p>Trier par</p>
          <SelectFilter
            values={allSortingOptions}
            setSelected={fContext.setSortingOption}
            current={fContext.sortingOption}
          />
        </div>

        <ul className="lane-filter-list">
          {allLane.map((l) => (
            <li key={l}>
              <LaneCheckBox
                lane={l}
                isSelected={fContext.laneFilter.includes(l)}
                onCheckboxChange={() => {
                  fContext.laneFilter.includes(l)
                    ? fContext.setLaneFilter(
                        fContext.laneFilter.filter((t) => t !== l)
                      )
                    : fContext.setLaneFilter([...fContext.laneFilter, l]);
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
                isSelected={fContext.masteriesLevelFilter.includes(m)}
                onCheckboxChange={() => {
                  fContext.masteriesLevelFilter.includes(m)
                    ? fContext.setMasteriesLevelFilter(
                        fContext.masteriesLevelFilter.filter((t) => t !== m)
                      )
                    : fContext.setMasteriesLevelFilter([
                        ...fContext.masteriesLevelFilter,
                        m,
                      ]);
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
                isSelected={fContext.roleFilter.includes(tag)}
                onCheckboxChange={() => {
                  fContext.roleFilter.includes(tag)
                    ? fContext.setRoleFilter(
                        fContext.roleFilter.filter((t) => t !== tag)
                      )
                    : fContext.setRoleFilter([...fContext.roleFilter, tag]);
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
                isSelected={fContext.regionFilter.includes(tag)}
                onCheckboxChange={() => {
                  fContext.regionFilter.includes(tag)
                    ? fContext.setRegionFilter(
                        fContext.regionFilter.filter((t) => t !== tag)
                      )
                    : fContext.setRegionFilter([...fContext.regionFilter, tag]);
                }}
              />
            </li>
          ))}
        </ul>
        <ChestCheckBox
          isSelected={fContext.chestFilter}
          onCheckboxChange={() =>
            fContext.chestFilter
              ? fContext.setChestFilter(false)
              : fContext.setChestFilter(true)
          }
        />
        <LeePrediction />
      </div>
    </>
  );
}

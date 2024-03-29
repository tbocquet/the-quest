//Section contenant les differents filtres applicables aux masteries

import { MasteryCheckBox } from "../Filters/MasteryCheckBox";
import { SearchBar } from "../Filters/SearchBar";
import { RoleCheckBox } from "../Filters/RoleCheckBox";
import { ChestCheckBox } from "../Filters/ChestCheckBox";
import { SelectFilter } from "../Filters/SelectFilter";
import { LeePrediction } from "../Filters/LeePrediction";
import { LaneCheckBox } from "../Filters/LaneCheckBox";
import { RegionCheckBox } from "../Filters/RegionCheckBox";
import { useMasteriesFilters } from "@/context/MasteriesFilterContext";
import { allLane, allRegions, allRole } from "../Filters/FiltersValues";

export function FiltersSection() {
  const fContext = useMasteriesFilters();

  const allMastery = [7, 6, 5, 4, 3, 2, 1, 0];
  const allSortingOptions = [
    "Points de maîtrise",
    "Niveau de maîtrise",
    "Nom de champion",
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

//Section contenant les differents filtres applicables aux champions

import { SearchBar } from "../Filters/SearchBar";
import { RoleCheckBox } from "../Filters/RoleCheckBox";
import { LaneCheckBox } from "../Filters/LaneCheckBox";
import { RegionCheckBox } from "../Filters/RegionCheckBox";
import "./styles/ChampionFilterSection.scss";

import { allLane, allRegions, allRole } from "../Filters/FiltersValues";
import { useChampionsFilters } from "@/context/ChampionsFilterContext";

export function FiltersSection() {
  const fContext = useChampionsFilters();

  return (
    <div className="lq-champions-filters">
      <div>
        <h3>Voie :</h3>
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
      </div>

      <div>
        <h3>Rôle :</h3>
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
      </div>
      <div>
        <h3>Région :</h3>
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
      </div>

      <div>
        <SearchBar
          search={fContext.championFilter}
          setSearch={fContext.setChampionFilter}
          suggestions={[]}
        />
      </div>
    </div>
  );
}

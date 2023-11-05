import ChampionTile from "@/components/Champions/ChampionTile";
import allChampions from "../../assets/champion.json";
import "./styles/Champions.scss";
import { FiltersSection } from "@/components/Champions/ChampionFilterSection";
import { useChampionsFilters } from "@/context/ChampionsFilterContext";
import { useEffect, useState } from "react";
import { Champion } from "@/models/Champion";

export default function Champions() {
  const filters = useChampionsFilters();
  const [champions, setChampions] = useState<Champion[]>(allChampions);

  const applyContextFilter = (champs: Champion[]) => {
    return champs.reduce((acc: Champion[], champ: Champion) => {
      /*Le filtre est il actif ?*/
      const Lfilter = filters.laneFilter.length !== 0;
      const Rfilter = filters.roleFilter.length !== 0;
      const Cfilter = filters.championFilter !== "";
      const REfilter = filters.regionFilter.length !== 0;

      /*L'élément correspond t'il aux filtres ?*/
      //lane
      const LOK = champ.lane.some((lane) => filters.laneFilter.includes(lane));
      //role
      const ROk = filters.roleFilter.every((item) => champ.tags.includes(item));
      //region
      const REOK = filters.regionFilter.some((region) =>
        champ.region.includes(region)
      );
      //name
      const champName = champ.name.toLocaleLowerCase();

      //L'élément correspond t'il à tous les filtres actif ?
      if (
        (!Cfilter || (Cfilter && champName.includes(filters.championFilter))) && //Ok with championSearchFilter
        (!Lfilter || (Lfilter && LOK)) && //Ok with laneFilter
        (!Rfilter || (Rfilter && ROk)) && //ok with roleFilter
        (!REfilter || (REfilter && REOK))
      ) {
        return [...acc, champ];
      } else {
        return acc;
      }
    }, []);
  };

  useEffect(() => {
    const T = applyContextFilter(allChampions);
    setChampions(T);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allChampions,
    filters.sortingOption,
    filters.roleFilter,
    filters.championFilter,
    filters.laneFilter,
    filters.regionFilter,
  ]);

  return (
    <div className="champions-component">
      <FiltersSection />

      {champions.map((champion, index) => (
        <ChampionTile data={champion} key={index} />
      ))}
    </div>
  );
}

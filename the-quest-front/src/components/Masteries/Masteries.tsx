import { ChampionMastery } from "@/models/ChampionMastery";
import "./Styles/Masteries.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import { useMasteriesFilters } from "@/context/MasteriesFilterContext";
import { FiltersSection } from "./FiltersSection";
import { useIsAnimationEnable } from "@/context/EnableAnimationsContext";
import { Mastery } from "./Mastery";
import { ReorderingList } from "../ReorderingList";

type Props = {
  masteries: ChampionMastery[];
};

export function Masteries({ masteries }: Props) {
  const filters = useMasteriesFilters();
  const { isEnable } = useIsAnimationEnable();
  const [championMasteries, setChampionMasteries] =
    useState<ChampionMastery[]>(masteries);

  function useWindowSize() {
    const [size, setSize] = useState([window.innerWidth, window.innerWidth]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const [width] = useWindowSize();

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

  //Renvoit une liste des championsMasteries correspondant aux filtres
  function getFilteredChampionMasteries(
    Mlist: ChampionMastery[]
  ): ChampionMastery[] {
    return Mlist.reduce(
      (acc: ChampionMastery[], champMast: ChampionMastery) => {
        /*Le filtre est il actif ?*/
        const Lfilter = filters.laneFilter.length !== 0;
        const Mfilter = filters.masteriesLevelFilter.length !== 0;
        const Rfilter = filters.roleFilter.length !== 0;
        const Cfilter = filters.championFilter !== "";
        const REfilter = filters.regionFilter.length !== 0;

        /*L'élément correspond t'il aux filtres ?*/
        const LOK = champMast.lane.some((lane) =>
          filters.laneFilter.includes(lane)
        ); //L'element contient t'il au moins une des lanes selectionnées
        const ROk = filters.roleFilter.every((item) =>
          champMast.tags.includes(item)
        );
        const MOk = filters.masteriesLevelFilter.includes(champMast.level);
        const REOK = filters.regionFilter.some((region) =>
          champMast.region.includes(region)
        );
        const champName = champMast.name.toLocaleLowerCase();

        //L'élément correspond t'il à tous les filtres actif ?
        if (
          (!Cfilter ||
            (Cfilter && champName.includes(filters.championFilter))) && //Ok with championSearchFilter
          (!filters.chestFilter ||
            (filters.chestFilter && !champMast.chestGranted)) && //Ok with chestFilter
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
  }

  //Filtrage et des masteries
  useEffect(() => {
    //Filtrage
    const T = getFilteredChampionMasteries(masteries);

    //Tri
    switch (filters.sortingOption) {
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
    filters.sortingOption,
    filters.masteriesLevelFilter,
    filters.roleFilter,
    filters.championFilter,
    filters.laneFilter,
    filters.chestFilter,
    filters.regionFilter,
  ]);

  return (
    <>
      <FiltersSection />
      {isEnable ? (
        <div className="lq-collection">
          <ReorderingList
            items={championMasteries}
            maxWidth={width * 0.9}
            elementHeight={200}
            elementWidth={200}
            itemsRenderFunction={(item, key) => (
              <Mastery championMastery={item} key={key} />
            )}
          />
        </div>
      ) : (
        <div className="lq-collection">
          {championMasteries.map((champMast, index) => (
            <Mastery key={index} championMastery={champMast} />
          ))}
        </div>
      )}
    </>
  );
}

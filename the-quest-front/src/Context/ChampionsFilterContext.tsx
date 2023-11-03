/*Context contenant l'id de l'invocateur dont le profil est actuellement regardé*/
import React, { createContext, useContext, useState, useEffect } from "react";

type ChampionsFiltersContext = {
  readonly laneFilter: string[];
  readonly setLaneFilter: (lanes: string[]) => void;

  readonly roleFilter: string[];
  readonly setRoleFilter: (roles: string[]) => void;

  readonly championFilter: string;
  readonly setChampionFilter: (champion: string) => void;

  readonly regionFilter: string[];
  readonly setRegionFilter: (regions: string[]) => void;

  readonly sortingOption: string;
  readonly setSortingOption: (options: string) => void;
};

const ChampionsFiltersContext = createContext<
  ChampionsFiltersContext | undefined
>(undefined);

export const ChampionsFiltersProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  //Récupération des données en caches
  const savedSortingOption = localStorage.getItem("championSortingOption");

  //Initialisation des states
  const [laneFilter, setLaneFilter] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);

  const [championFilter, setChampionFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string[]>([]);

  const [sortingOption, setSortingOption] = useState<string>(
    savedSortingOption ? JSON.parse(savedSortingOption) : ""
  );

  //Sauvegarde de l'option de tri
  useEffect(() => {
    //console.log("sorting opt : " + sortingOption);
    localStorage.setItem(
      "championSortingOption",
      JSON.stringify(sortingOption)
    );
  }, [sortingOption]);

  const value: ChampionsFiltersContext = {
    laneFilter,
    setLaneFilter,
    roleFilter,
    setRoleFilter,
    championFilter,
    setChampionFilter,
    regionFilter,
    setRegionFilter,
    sortingOption,
    setSortingOption,
  };

  return (
    <ChampionsFiltersContext.Provider value={value}>
      {children}
    </ChampionsFiltersContext.Provider>
  );
};

export const useChampionsFilters = (): ChampionsFiltersContext => {
  const context = useContext(ChampionsFiltersContext);
  if (context === undefined) {
    throw new Error(
      "useChampionsFilters must be used within a ChampionsFiltersProvider"
    );
  }
  return context;
};

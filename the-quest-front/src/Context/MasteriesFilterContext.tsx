/*Context contenant l'id de l'invocateur dont le profil est actuellement regardé*/
import React, { createContext, useContext, useState, useEffect } from "react";

type MasteriesFiltersContext = {
  readonly laneFilter: string[];
  readonly setLaneFilter: (lanes: string[]) => void;

  readonly roleFilter: string[];
  readonly setRoleFilter: (roles: string[]) => void;

  readonly masteriesLevelFilter: number[];
  readonly setMasteriesLevelFilter: (levels: number[]) => void;

  readonly championFilter: string;
  readonly setChampionFilter: (champion: string) => void;

  readonly regionFilter: string[];
  readonly setRegionFilter: (regions: string[]) => void;

  readonly chestFilter: boolean;
  readonly setChestFilter: (chest: boolean) => void;

  readonly sortingOption: string;
  readonly setSortingOption: (options: string) => void;
};

const MasteriesFiltersContext = createContext<
  MasteriesFiltersContext | undefined
>(undefined);

export const MasteriesFiltersProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  //Récupération des données en caches
  const savedSortingOption = localStorage.getItem("masterySortingOption");
  const savedMasteriesLevelFilter = localStorage.getItem(
    "MasteriesLevelFilter"
  );

  //Initialisation des states
  const [laneFilter, setLaneFilter] = useState<string[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);

  const [masteriesLevelFilter, setMasteriesLevelFilter] = useState<number[]>(
    savedMasteriesLevelFilter ? JSON.parse(savedMasteriesLevelFilter) : []
  );

  const [championFilter, setChampionFilter] = useState<string>("");
  const [chestFilter, setChestFilter] = useState<boolean>(false);
  const [regionFilter, setRegionFilter] = useState<string[]>([]);

  const [sortingOption, setSortingOption] = useState<string>(
    savedSortingOption ? JSON.parse(savedSortingOption) : ""
  );

  //Sauvegarde de l'option de tri
  useEffect(() => {
    //console.log("sorting opt : " + sortingOption);
    localStorage.setItem("masterySortingOption", JSON.stringify(sortingOption));
  }, [sortingOption]);

  //Sauvegarde du filtre sur le niveau de maitrise
  useEffect(() => {
    localStorage.setItem(
      "MasteriesLevelFilter",
      JSON.stringify(masteriesLevelFilter)
    );
  }, [masteriesLevelFilter]);

  const value: MasteriesFiltersContext = {
    laneFilter,
    setLaneFilter,
    roleFilter,
    setRoleFilter,
    masteriesLevelFilter,
    setMasteriesLevelFilter,
    championFilter,
    setChampionFilter,
    chestFilter,
    setChestFilter,
    regionFilter,
    setRegionFilter,
    sortingOption,
    setSortingOption,
  };

  return (
    <MasteriesFiltersContext.Provider value={value}>
      {children}
    </MasteriesFiltersContext.Provider>
  );
};

export const useMasteriesFilters = (): MasteriesFiltersContext => {
  const context = useContext(MasteriesFiltersContext);
  if (context === undefined) {
    throw new Error(
      "useMasteriesFilters must be used within a MasteriesFiltersProvider"
    );
  }
  return context;
};

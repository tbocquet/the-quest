/*Context contenant les niveau de masteries de l'invocateur recherché*/

import React, { createContext, useContext, useEffect, useState } from "react";
import { ChampionMastery } from "@/models/type";

type SummonerMasteriesContext = {
  readonly sumMasteryList: ChampionMastery[];
  readonly getSumMastery: (championKey: string) => ChampionMastery | undefined;
  readonly setSumMasteryList: (sumMasteryList: ChampionMastery[]) => void;
};

const SummonerMasteriesContext = createContext<
  SummonerMasteriesContext | undefined
>(undefined);

export const SummonerMasteriesProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const saved = localStorage.getItem("SummonerMasteries");
  const [sumMasteryList, setSumMasteryList] = useState<ChampionMastery[]>(
    saved ? JSON.parse(saved) : []
  );

  useEffect(() => {
    localStorage.setItem("SummonerMasteries", JSON.stringify(sumMasteryList));
  }, [sumMasteryList]);

  function mySetSumList(list: ChampionMastery[]): void {
    setSumMasteryList(list);
  }

  function getSumMastery(championId: string): ChampionMastery | undefined {
    return sumMasteryList.find((elt) => elt.id === championId);
  }

  const value: SummonerMasteriesContext = {
    sumMasteryList,
    getSumMastery,
    setSumMasteryList,
  };

  return (
    <SummonerMasteriesContext.Provider value={value}>
      {children}
    </SummonerMasteriesContext.Provider>
  );
};

export const useSummonerMasteries = (): SummonerMasteriesContext => {
  const context = useContext(SummonerMasteriesContext);
  if (context === undefined) {
    throw new Error(
      "SummonerMasteriesContext must be used within a SummonerMasteriesContextProvider"
    );
  }
  return context;
};

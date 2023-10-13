/*Context de gestion de la liste des Invocateurs déjà recherchés*/

import React, { createContext, useContext, useEffect, useState } from "react";
import { SummonerData } from "@/models/ChampionMastery";

type SumListContext = {
  readonly sumList: SummonerData[];
  readonly setSumList: (sumElt: SummonerData) => void;
  readonly deleteSumEltFromList: (sumElt: SummonerData) => void;
};

const SumListContext = createContext<SumListContext | undefined>(undefined);

export const SumListProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const savedSumList = localStorage.getItem("summonerHistoryList");
  const [sumList, setSumList] = useState<SummonerData[]>(
    savedSumList ? JSON.parse(savedSumList) : []
  );

  useEffect(() => {
    localStorage.setItem("summonerHistoryList", JSON.stringify(sumList));
    //console.log(sumList);
  }, [sumList]);

  function mySetSumList(elt: SummonerData): void {
    if (elt.id !== undefined) {
      //on ajoute le nouvel élément à la fin de la liste
      if (!sumList.some((sumElt) => sumElt.id === elt.id)) {
        if (sumList.length < 10) {
          setSumList([...sumList, elt]);
        }
      }
      //on met à jour les données de l'élément existant
      else {
        setSumList(
          sumList.map((sumElt) => (sumElt.id === elt.id ? elt : sumElt))
        );
      }
    }
  }

  function deleteSumElt(elt: SummonerData): void {
    const listWithoutTheEltement = sumList.filter(
      (currentElt) => currentElt.id !== elt.id
    );
    setSumList(listWithoutTheEltement);
  }

  const value: SumListContext = {
    sumList,
    setSumList: mySetSumList,
    deleteSumEltFromList: deleteSumElt,
  };

  return (
    <SumListContext.Provider value={value}>{children}</SumListContext.Provider>
  );
};

export const useSumList = (): SumListContext => {
  const context = useContext(SumListContext);
  if (context === undefined) {
    throw new Error(
      "SumListContext must be used within a SumListContextProvider"
    );
  }
  return context;
};

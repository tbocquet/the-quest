/*Context de gestion de la liste des Invocateurs déjà recherchés*/

import { SummonerAccount } from "@/models/SummonerAccount";
import React, { createContext, useContext, useEffect, useState } from "react";

type SumListContext = {
  readonly sumList: SummonerAccount[];
  readonly setSumList: (sumElt: SummonerAccount) => void;
  readonly deleteSumEltFromList: (sumElt: SummonerAccount) => void;
};

const SumListContext = createContext<SumListContext | undefined>(undefined);

export const SumListProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const savedSumList = localStorage.getItem("summonerHistoryList");
  const [sumList, setSumList] = useState<SummonerAccount[]>(
    savedSumList ? JSON.parse(savedSumList) : []
  );

  useEffect(() => {
    localStorage.setItem("summonerHistoryList", JSON.stringify(sumList));
    //console.log(sumList);
  }, [sumList]);

  function mySetSumList(elt: SummonerAccount): void {
    if (elt.summonerId !== undefined) {
      //on ajoute le nouvel élément à la fin de la liste
      if (!sumList.some((sumElt) => sumElt.summonerId === elt.summonerId)) {
        if (sumList.length < 10) {
          setSumList([...sumList, elt]);
        }
      }
      //on met à jour les données de l'élément existant
      else {
        setSumList(
          sumList.map((sumElt) =>
            sumElt.summonerId === elt.summonerId ? elt : sumElt
          )
        );
      }
    }
  }

  function deleteSumElt(elt: SummonerAccount): void {
    const listWithoutTheEltement = sumList.filter(
      (currentElt) => currentElt.summonerId !== elt.summonerId
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

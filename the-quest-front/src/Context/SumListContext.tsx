/*Context de gestion de la liste des Invocateurs déjà recherchés*/

import React, { createContext, useContext, useEffect, useState } from "react";
import { getSummonerProfileIcon } from "../API_call";

export type SumElt = {
  id: string; // SummonerId
  name: string; // SummonerName
  url: string; // Profile icon url
};

type SumListContext = {
  readonly sumList: SumElt[];
  readonly setSumList: (sumElt: SumElt) => void;
  readonly deleteSumEltFromList: (sumElt: SumElt) => void;
};

const SumListContext = createContext<SumListContext | undefined>(undefined);

export const SumListProvider: React.FC = ({ children }) => {
  const savedSumList = localStorage.getItem("sumList");
  const [sumList, setSumList] = useState<SumElt[]>(
    savedSumList ? JSON.parse(savedSumList) : []
  );

  useEffect(() => {
    localStorage.setItem("sumList", JSON.stringify(sumList));
    //console.log(sumList);
  }, [sumList]);

  function mySetSumList(elt: any): void {
    if (elt.id !== undefined) {
      //on ajoute le nouvel élément à la fin de la liste
      if (!sumList.some((sumElt) => sumElt.id === elt.id)) {
        const newSumElt: SumElt = {
          id: elt.id,
          name: elt.name,
          url: "/profileIcons/" + elt.profileIconId + ".png",
        };

        if (sumList.length < 10) {
          setSumList([...sumList, newSumElt]);
        }
      }
      //on met à jour les données de l'élément existant
      else {
        setSumList(
          sumList.map((sumElt) =>
            sumElt.id === elt.id
              ? {
                  id: elt.id,
                  name: elt.name,
                  url: getSummonerProfileIcon(elt.profileIconId),
                }
              : sumElt
          )
        );
      }
    }
  }

  function deleteSumElt(elt: SumElt): void {
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

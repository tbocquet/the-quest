import React, { createContext, useContext, useEffect, useState } from "react";
import { getSummonerProfileIcon } from "./API_call";

type SumElt = {
  id: string;
  name: string;
  url: string;
};

type SumListContext = {
  readonly sumList: SumElt[];
  readonly setSumList: (sumElt: SumElt) => void;
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
    if (
      elt.id !== undefined &&
      !sumList.some((sumElt) => sumElt.id === elt.id)
    ) {
      const newSumElt: SumElt = {
        id: elt.id,
        name: elt.name,
        url: getSummonerProfileIcon(elt.profileIconId),
      };
      if (sumList.length < 10) {
        setSumList([...sumList, newSumElt]);
      } else {
        const [_, ...tail] = sumList;
        setSumList([...tail, newSumElt]);
      }
    }
  }

  const value: SumListContext = {
    sumList,
    setSumList: mySetSumList,
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

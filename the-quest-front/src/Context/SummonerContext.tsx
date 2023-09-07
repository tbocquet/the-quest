/*Context contenant l'id de l'invocateur dont le profil est actuellement regardé*/
import React, { createContext, useContext, useState, useEffect } from "react";

type SummonerContext = {
  readonly summonerId: string;
  readonly setSummonerId: (summonerData: string) => void;
};

const SummonerContext = createContext<SummonerContext | undefined>(undefined);

export const SummonerProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const savedSum = localStorage.getItem("summonerId");
  const [summonerId, setSummonerId] = useState<string>(
    savedSum ? JSON.parse(savedSum) : ""
  );

  useEffect(() => {
    localStorage.setItem("summonerId", JSON.stringify(summonerId));
  }, [summonerId]);

  const value: SummonerContext = {
    summonerId,
    setSummonerId,
  };

  return (
    <SummonerContext.Provider value={value}>
      {children}
    </SummonerContext.Provider>
  );
};

export const useSummoner = (): SummonerContext => {
  const context = useContext(SummonerContext);
  if (context === undefined) {
    throw new Error("useSummoner must be used within a SummonerProvider");
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from "react";

type SummonerContext = {
  readonly summoner: string;
  readonly setSummoner: (summoner: string) => void;
};

const SummonerContext = createContext<SummonerContext | undefined>(undefined);

export const SummonerProvider: React.FC = ({ children }) => {
  const savedSum = localStorage.getItem("summoner");
  const [summoner, setSummoner] = useState<string>(
    savedSum ? JSON.parse(savedSum) : ""
  );

  useEffect(() => {
    localStorage.setItem("summoner", JSON.stringify(summoner));
  }, [summoner]);

  const value: SummonerContext = {
    summoner,
    setSummoner,
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

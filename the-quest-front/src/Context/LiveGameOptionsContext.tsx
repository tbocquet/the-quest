/*Context contenant l'id de l'invocateur dont le profil est actuellement regardé*/
import React, { createContext, useContext, useState, useEffect } from "react";

type LiveGameOptionsContext = {
  readonly queueOption: string;
  readonly setQueueOption: (queue: string) => void;

  readonly periodOption: string;
  readonly setPeriodOption: (queue: string) => void;
};

const LiveGameOptionsContext = createContext<
  LiveGameOptionsContext | undefined
>(undefined);

export const LiveGameOptionsprovider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  //Récupération des données en caches
  const savedQueueOptions = localStorage.getItem("liveGameQueueOption");
  const savedPeriodOptions = localStorage.getItem("liveGamePeriodOption");

  //Initialisation des states
  const [queueOption, setQueueOption] = useState<string>(
    savedQueueOptions ?? ""
  );
  const [periodOption, setPeriodOption] = useState<string>(
    savedPeriodOptions ?? ""
  );

  //Sauvegarde des options
  useEffect(() => {
    localStorage.setItem("liveGameQueueOption", queueOption);
  }, [queueOption]);
  useEffect(() => {
    localStorage.setItem("liveGamePeriodOption", periodOption);
  }, [periodOption]);

  const value: LiveGameOptionsContext = {
    queueOption,
    setQueueOption,
    periodOption,
    setPeriodOption,
  };

  return (
    <LiveGameOptionsContext.Provider value={value}>
      {children}
    </LiveGameOptionsContext.Provider>
  );
};

export const useLiveGameOptions = (): LiveGameOptionsContext => {
  const context = useContext(LiveGameOptionsContext);
  if (context === undefined) {
    throw new Error(
      "useLiveGameOptions must be used within a LiveGameOptionsprovider"
    );
  }
  return context;
};

/*Context contenant l'id de l'invocateur dont le profil est actuellement regardé*/
import React, { createContext, useContext, useState, useEffect } from "react";

type EnableAnimationsContext = {
  readonly isEnable: boolean;
  readonly setIsEnable: (summonerData: boolean) => void;
};

const EnableAnimationsContext = createContext<
  EnableAnimationsContext | undefined
>(undefined);

export const EnableAnimationProvider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const saved = localStorage.getItem("isAnimationsEnable");
  const [isEnable, setIsEnable] = useState<boolean>(
    saved ? JSON.parse(saved) : true
  );

  useEffect(() => {
    localStorage.setItem("isAnimationsEnable", JSON.stringify(isEnable));
  }, [isEnable]);

  const value: EnableAnimationsContext = {
    isEnable,
    setIsEnable,
  };

  return (
    <EnableAnimationsContext.Provider value={value}>
      {children}
    </EnableAnimationsContext.Provider>
  );
};

export const useIsAnimationEnable = (): EnableAnimationsContext => {
  const context = useContext(EnableAnimationsContext);
  if (context === undefined) {
    throw new Error(
      "useIsAnimationEnable must be used within a EnableAnimationContext.Provider"
    );
  }
  return context;
};

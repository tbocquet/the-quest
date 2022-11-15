/*Contexte contenant le pseudo du pseudo recherché*/
import React, { createContext, useContext, useState, useEffect } from "react";

type SearchContext = {
  readonly search: string;
  readonly setSearch: (search: string) => void;
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

export const SearchProvider: React.FC = ({ children }) => {
  const savedSearch = localStorage.getItem("search");
  const [search, setSearch] = useState<string>(
    savedSearch ? JSON.parse(savedSearch) : ""
  );

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(search));
  }, [search]);

  const value: SearchContext = {
    search,
    setSearch,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = (): SearchContext => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSummoner must be used within a SearchProvider");
  }
  return context;
};

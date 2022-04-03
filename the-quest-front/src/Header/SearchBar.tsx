import { useState } from "react";
import "./Styles/SearchBar.scss";
type Props = {
  suggestions: string[] | null;
  setResult: (search: string) => void;
  defaultValue: string;
};
export function SearchBar({ suggestions, setResult, defaultValue }: Props) {
  const [search, setSearch] = useState<string>(defaultValue);
  function onChangeHandler(v: string): void {
    setSearch(v);
  }
  function handleKeyPress(key: string) {
    if (key === "Enter") {
      setResult(search);
    }
  }
  return (
    <div className="lq-searchBar">
      <input
        type="text"
        value={search}
        placeholder="Rechercher un invocateur"
        onChange={(e) => onChangeHandler(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e.key)}
      ></input>
    </div>
  );
}

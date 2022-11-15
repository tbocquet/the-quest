import { useEffect, useState } from "react";
import { useSearch } from "../Context/SearchContext";
import "./Styles/SearchBar.scss";

export function SearchBar() {
  const { search, setSearch } = useSearch();
  const [searchState, setStateSearch] = useState<string>("");
  const [searchIcon, setSearchIcon] = useState("/icons/search-icon2.png");

  useEffect(() => {
    setStateSearch(search);
  }, [search]);

  function onChangeHandler(v: string): void {
    setStateSearch(v);
  }

  function handleKeyPress(key: string) {
    if (key === "Enter") {
      setSearch(searchState);
    }
  }

  return (
    <div className="lq-searchBar">
      <input
        type="text"
        value={searchState}
        placeholder="Rechercher un invocateur"
        onChange={(e) => onChangeHandler(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e.key)}
      ></input>

      <div
        className="search-icon-block"
        onMouseEnter={() => setSearchIcon("/icons/search-icon.png")}
        onMouseLeave={() => setSearchIcon("/icons/search-icon2.png")}
        onClick={() => searchState !== "" && setSearch(searchState)}
      >
        <img className="search-icon" alt="" src={searchIcon}></img>
      </div>
    </div>
  );
}

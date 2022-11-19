/*Bare de recherche du header, set le context useSummoner. Quand l'incovateur n'existe pas,set le summonerId à "-1"*/
import { useState } from "react";
import { getSummonerDataByName } from "../API_call";
import { useSummoner } from "../Context/SummonerContext";
import "./Styles/SearchBar.scss";

export function SearchBar() {
  const [searchState, setStateSearch] = useState<string>("");
  const [searchIcon, setSearchIcon] = useState("/icons/search-icon2.png");
  const { setSummonerId } = useSummoner();

  /*Capture les entrées clavier de l'input text*/
  function onChangeHandler(v: string): void {
    setStateSearch(v);
  }

  /*Lancer la recherche quand on appuie sur "entrer"*/
  function handleKeyPress(key: string) {
    if (key === "Enter" && searchState !== "") {
      getSummonerDataByName(searchState)
        .then((res) => setSummonerId(res.id))
        .catch(() => setSummonerId("-1"));
    }
  }

  /*Lancer la recherche quand on clique sur l'icon de loupe*/
  function onClickSearch() {
    if (searchState !== "") {
      getSummonerDataByName(searchState)
        .then((res) => setSummonerId(res.id))
        .catch(() => setSummonerId("-1"));
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
        onClick={() => onClickSearch()}
      >
        <img className="search-icon" alt="" src={searchIcon}></img>
      </div>
    </div>
  );
}

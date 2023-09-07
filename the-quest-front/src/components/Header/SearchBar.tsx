/*Bare de recherche du header, set le context useSummoner. Quand l'incovateur n'existe pas,set le summonerId à "-1"*/
import { useState } from "react";
import "./Styles/SearchBar.scss";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const [searchState, setStateSearch] = useState<string>("");
  const [searchIcon, setSearchIcon] = useState<string>(
    "/images/icons/others/search-icon-dark.png"
  );
  const navigate = useNavigate();

  /*Capture les entrées clavier de l'input text*/
  function onChangeHandler(v: string): void {
    setStateSearch(v);
  }

  /*Lancer la recherche quand on appuie sur "entrer"*/
  function handleKeyPress(key: string) {
    if (key === "Enter" && searchState !== "") {
      navigate(`/invocateur/${searchState}`);
    }
  }

  /*Lancer la recherche quand on clique sur l'icon de loupe*/
  function onClickSearch() {
    if (searchState !== "") {
      navigate(`/invocateur/${searchState}`);
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
        onMouseEnter={() =>
          setSearchIcon("/images/icons/others/search-icon-light.png")
        }
        onMouseLeave={() =>
          setSearchIcon("/images/icons/others/search-icon-dark.png")
        }
        onClick={() => onClickSearch()}
      >
        <img className="search-icon" alt="" src={searchIcon}></img>
      </div>
    </div>
  );
}

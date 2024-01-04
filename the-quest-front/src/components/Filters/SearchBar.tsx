import "./Styles/SearchBar.scss";
type Props = {
  suggestions: string[] | null;
  search: string;
  setSearch: (search: string) => void;
};
export function SearchBar({ search, setSearch }: Props) {
  function onChangeHandler(v: string): void {
    setSearch(v);
  }

  return (
    <div className="lq-searchBar-champion-filter">
      <input
        type="text"
        spellCheck={false}
        value={search}
        placeholder="Rechercher un champion"
        onChange={(e) => onChangeHandler(e.target.value)}
      ></input>
    </div>
  );
}

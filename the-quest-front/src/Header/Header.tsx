import { useSummoner } from "../SummonerContext";
import { SearchBar } from "./SearchBar";
import { SumList } from "./SumList";
import "./Styles/Header.scss";

export function Header() {
  const { summoner, setSummoner } = useSummoner();
  return (
    <div className="lq-header">
      <SearchBar
        defaultValue={summoner}
        suggestions={[]}
        setResult={setSummoner}
      />
      <SumList />
    </div>
  );
}

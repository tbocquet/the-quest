import { useSummoner } from "../SummonerContext";
import { SearchBar } from "./SearchBar";
import { SumList } from "./SumList";
import "./Styles/Header.scss";
import { Contact } from "./Contact";

export function Header() {
  const { summoner, setSummoner } = useSummoner();
  return (
    <div className="header">
      <div className="lq-header">
        <SearchBar
          defaultValue={summoner}
          suggestions={[]}
          setResult={setSummoner}
        />
        <SumList />
      </div>
      <Contact />
    </div>
  );
}

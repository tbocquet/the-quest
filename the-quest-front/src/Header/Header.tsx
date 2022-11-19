import { SearchBar } from "./SearchBar";
import { SumList } from "./SumList";
import { useSummoner } from "../Context/SummonerContext";
import "./Styles/Header.scss";

export function Header() {
  const { setSummonerId } = useSummoner();
  return (
    <div className="header">
      <h2 onClick={() => setSummonerId("")}>La quête</h2>
      <SumList />
      <SearchBar />
    </div>
  );
}

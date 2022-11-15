import { SearchBar } from "./SearchBar";
import { SumList } from "./SumList";
import { Contact } from "./Contact";
import "./Styles/Header.scss";

export function Header() {
  return (
    <div className="header">
      <h2>La quête</h2>
      <SumList />
      <SearchBar />
    </div>
  );
}

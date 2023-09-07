import { SearchBar } from "./SearchBar";
import { SumList } from "./SumList";
import "./Styles/Header.scss";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="header">
      <Link to="/">
        <h2>La quête</h2>
      </Link>
      <SumList />
      <SearchBar />
    </div>
  );
}

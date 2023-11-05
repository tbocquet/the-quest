import { SearchBar } from "./SearchBar";
import { SumList } from "./SumList";
import "./Styles/Header.scss";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="header">
      <div className="header-nav">
        <Link to="/">
          <h2>La quête</h2>
        </Link>
        <div className="nav-bloc">
          <Link to="/champions">
            <img
              alt="champions-icon"
              src="/images/icons/others/runterra.webp"
            ></img>
          </Link>
        </div>
      </div>
      <SumList />
      <SearchBar />
    </div>
  );
}

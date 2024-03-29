import { useEffect, useState } from "react";
import "./SummonerNavBar.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import { RiotId } from "@/models/RiotId";

type Props = { currentUser: RiotId };
export function SummonerNavBar({ currentUser }: Props) {
  const [onglet, setOnglet] = useState(0);
  const location = useLocation();

  useEffect(() => {
    location.pathname.endsWith("/accomplissements")
      ? setOnglet(1)
      : setOnglet(0);
  }, [location]);

  return (
    <nav className="the-quest-app-nav">
      <ul>
        <Link to="">
          <li className={onglet === 0 ? "selected" : ""}>Maîtrises</li>
        </Link>
        <Link to="accomplissements">
          <li className={onglet === 1 ? "selected" : ""}>Succès</li>
        </Link>
        <Link
          to={`/liveGame/${encodeURI(currentUser.gameName)}/${encodeURI(
            currentUser.tagLine
          )}`}
        >
          <li className={onglet === 2 ? "selected" : ""}>Partie en cours</li>
        </Link>
      </ul>
      <div className="animations-toggle-switch">
        <ToggleSwitch />
      </div>
    </nav>
  );
}

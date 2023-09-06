/*Liste des summoners déjà consulté.*/

import { Link } from "react-router-dom";
import { useSumList } from "../Context/SumListContext";
import { useSummoner } from "../Context/SummonerContext";

import "./Styles/SumList.scss";
import { SumListElementIcon } from "./SumListElementIcon";

export function SumList() {
  const { sumList, deleteSumEltFromList } = useSumList();

  return (
    <div className="lq-sumList">
      {sumList.map((sumElt) => (
        <Link to={`/summoner/${sumElt.name}`} key={sumElt.id}>
          <div className="lq-sumList-elt">
            <div className="sumIcon-container">
              <div
                className="delete-sumElt"
                onClick={(e) => {
                  deleteSumEltFromList(sumElt);
                  e.stopPropagation();
                }}
              >
                x
              </div>

              <SumListElementIcon iconId={sumElt.profileIconId} />
            </div>
            <div className="sumName">{sumElt.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

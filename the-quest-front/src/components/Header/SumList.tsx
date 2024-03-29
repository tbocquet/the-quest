/*Liste des summoners déjà consulté.*/

import { Link } from "react-router-dom";
import { useSumList } from "../../context/SumListContext";

import "./Styles/SumList.scss";
import { SumListElementIcon } from "./SumListElementIcon";

export function SumList() {
  const { sumList, deleteSumEltFromList } = useSumList();

  return (
    <div className="lq-sumList">
      {sumList.map((sumElt) => (
        <Link
          to={`/invocateur/${sumElt.gameName}/${sumElt.tagLine}`}
          key={sumElt.summonerId}
        >
          <div className="lq-sumList-elt">
            <div className="sumIcon-container">
              <div
                className="delete-sumElt"
                onClick={(e) => {
                  deleteSumEltFromList(sumElt);
                  e.preventDefault();
                }}
              >
                x
              </div>
              <SumListElementIcon iconId={sumElt.profileIconId} />
            </div>
            <div className="sumName">{sumElt.gameName}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

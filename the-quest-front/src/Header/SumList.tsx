/*Liste des summoners déjà consulté.*/

import { useSumList } from "../Context/SumListContext";
import { useSummoner } from "../Context/SummonerContext";

import "./Styles/SumList.scss";
import { SumListElementIcon } from "./SumListElementIcon";

export function SumList() {
  const { sumList, deleteSumEltFromList } = useSumList();
  const { setSummonerId } = useSummoner();

  return (
    <div className="lq-sumList">
      {sumList.map((sumElt) => (
        <div
          className="lq-sumList-elt"
          key={sumElt.id}
          onClick={() => {
            console.log("SummonerId is set with : " + sumElt.id);
            setSummonerId(sumElt.id);
          }}
        >
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

            <SumListElementIcon iconId={sumElt.iconId} />
          </div>
          <div className="sumName">{sumElt.name}</div>
        </div>
      ))}
    </div>
  );
}

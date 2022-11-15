/*Liste des summoners déjà consulté.*/

import { getSummonerDefaultProfileIcon } from "../API_call";
import { useSumList } from "../Context/SumListContext";
import { useSummoner } from "../Context/SummonerContext";
import { getSummonerIcon } from "../imageGetter";

import "./Styles/SumList.scss";

export function SumList() {
  const { sumList, deleteSumEltFromList } = useSumList();
  const { setSummonerId } = useSummoner();

  return (
    <div className="lq-sumList">
      {sumList.map((sumElt) => (
        <div
          className="lq-sumList-elt"
          key={sumElt.id}
          onClick={() => setSummonerId(sumElt.id)}
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
            <img
              src={getSummonerIcon(sumElt.url)}
              alt={sumElt.name}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = getSummonerDefaultProfileIcon();
              }}
              className="sumIcon"
            />
          </div>
          <div className="sumName">{sumElt.name}</div>
        </div>
      ))}
    </div>
  );
}

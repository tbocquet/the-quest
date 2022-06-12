import { useSumList } from "../SumListContext";
import { useSummoner } from "../SummonerContext";
import "./Styles/SumList.scss";

export function SumList() {
  const { sumList, deleteSumEltFromList } = useSumList();
  const { setSummoner } = useSummoner();

  return (
    <div className="lq-sumList">
      {sumList.map((sumElt) => (
        <div
          className="lq-sumList-elt"
          key={sumElt.id}
          onClick={() => setSummoner(sumElt.name)}
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
            <img src={sumElt.url} alt={sumElt.name} className="sumIcon"></img>
          </div>
          <div className="sumName">{sumElt.name}</div>
        </div>
      ))}
    </div>
  );
}

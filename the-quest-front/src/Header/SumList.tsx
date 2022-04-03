import { useSumList } from "../SumListContext";
import { useSummoner } from "../SummonerContext";
import "./Styles/SumList.scss";

export function SumList() {
  const { sumList } = useSumList();
  const { setSummoner } = useSummoner();
  return (
    <div className="lq-sumList">
      {sumList.map((sumElt) => (
        <div
          className="lq-sumList-elt"
          key={sumElt.id}
          onClick={() => setSummoner(sumElt.name)}
        >
          <img src={sumElt.url} alt={sumElt.name} className="sumIcon"></img>
          <div className="sumName">{sumElt.name}</div>
        </div>
      ))}
    </div>
  );
}

/*Petite liste montrant quels champions sont necessaires pour un succès*/
import { useSummonerMasteries } from "../Context/SummonerMasteries";
import { getChampionTile } from "../imageGetter";
import { ChampionMastery } from "../type";
import "./Styles/ChampionList.scss";

type Props = {
  champions: string[];
};

export function ChampionList({ champions }: Props) {
  const { getSumMastery } = useSummonerMasteries();

  function isChampMastery7(champId: string): boolean {
    const M: ChampionMastery | undefined = getSumMastery(champId);

    return M !== undefined && M.level === 7;
  }

  return (
    <ul className="succcess-champion-list">
      {champions.map((champId, index) => (
        <li key={index}>
          <img
            className={isChampMastery7(champId) ? "isOwned" : ""}
            src={getChampionTile(champId)}
            alt=""
          />
        </li>
      ))}
    </ul>
  );
}

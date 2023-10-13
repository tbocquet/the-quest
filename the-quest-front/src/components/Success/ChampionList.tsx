/*Petite liste montrant quels champions sont necessaires pour un succès*/
import { getChampionTile } from "@/services/imageGetter";
import { ChampionMastery } from "@/models/ChampionMastery";
import "./Styles/ChampionList.scss";
import { useRouteLoaderData } from "react-router-dom";

type Props = {
  champions: string[];
};

export function ChampionList({ champions }: Props) {
  const data = useRouteLoaderData("summoner") as any;
  const sumMasteryList = data.summonerMasteries as ChampionMastery[];

  function isChampMastery7(champId: string): boolean {
    const M: ChampionMastery | undefined = getSumMastery(champId);

    return M !== undefined && M.level === 7;
  }

  function getSumMastery(championId: string): ChampionMastery | undefined {
    return sumMasteryList.find((elt) => elt.id === championId);
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

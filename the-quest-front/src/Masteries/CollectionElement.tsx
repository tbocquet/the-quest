import "./Styles/CollectionElement.scss";
import { ChampionMastery } from "../type";
import {
  getChampionTile,
  getChestIcon,
  getMasteryIcon,
  getTokenIcon,
} from "../imageGetter";

type Props = {
  championMastery: ChampionMastery;
};
export function CollectionElement({ championMastery }: Props) {
  return (
    <div className="lq-collectionElement">
      {/*Champion */}
      <div className="champion-container">
        <img
          className="champion"
          alt=""
          src={getChampionTile(championMastery.id)}
        ></img>
      </div>
      {championMastery.level > 4 ? (
        <div className="champion-mastery-point">
          {championMastery.points} pts
        </div>
      ) : (
        <div className="champion-mastery-point">
          {championMastery.pointsSinceLastLevel}
          {" / "}
          {championMastery.pointsSinceLastLevel +
            championMastery.pointsUntilNextLevel}{" "}
          pts
        </div>
      )}
      {/*Token */}
      {championMastery.tokensEarned > 0 && (
        <div className="token-block">
          <img
            alt=""
            className="token-overlay"
            src={getTokenIcon(championMastery.level + 1)}
          ></img>
          <img
            className="overlay-background"
            alt=""
            src={getChampionTile(championMastery.id)}
          ></img>
          <div className="token-amount">{championMastery.tokensEarned}</div>
        </div>
      )}

      {/*Mastery */}
      <img
        alt=""
        className="mastery"
        src={getMasteryIcon(championMastery.level)}
      ></img>

      {/*Coffre */}
      {championMastery.chestGranted && (
        <img alt="" className="chest-icon" src={getChestIcon()}></img>
      )}
    </div>
  );
}

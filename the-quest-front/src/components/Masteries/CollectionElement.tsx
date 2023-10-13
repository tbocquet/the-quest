import "./Styles/CollectionElement.scss";
import { ChampionMastery } from "@/models/ChampionMastery";
import {
  getChampionTile,
  getChampionSmallTile,
  getChestIcon,
  getMasteryIcon,
  getTokenIcon2,
} from "@/services/imageGetter";

type Props = {
  championMastery: ChampionMastery;
};
export function CollectionElement({ championMastery }: Props) {
  return (
    <div className="lq-mastery">
      <img
        className="champion-img"
        alt=""
        src={getChampionTile(championMastery.id)}
      ></img>

      <div className="info-container">
        {/*Icon Mastery */}
        <img
          alt=""
          className="mastery-icon"
          src={getMasteryIcon(championMastery.level)}
        ></img>

        {/*Coffre */}
        {championMastery.chestGranted && (
          <img alt="" className="chest-icon" src={getChestIcon()}></img>
        )}

        {/* Nom du champion */}
        <div className="champion-name">{championMastery.name}</div>
        {/* Point de maitrise */}
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
          <div className="token-container">
            {/* Overlay */}
            <img
              alt=""
              className="overlay-img"
              src={getTokenIcon2(championMastery.level + 1)}
            ></img>

            {/* Champion Icon */}
            <div className="champion-img-container">
              <img
                className="champion-img"
                alt=""
                src={getChampionSmallTile(championMastery.id)}
              ></img>
              <div className="token-amount">{championMastery.tokensEarned}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

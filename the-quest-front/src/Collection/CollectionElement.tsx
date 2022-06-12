import "./Styles/CollectionElement.scss";
import { ChampionMastery } from "../type";
import { chestSrc, getMasterySrc, getTokenSrc } from "../imagesSrc";
type Props = {
  championMastery: ChampionMastery;
};
export function CollectionElement({ championMastery }: Props) {
  return (
    <div className="lq-collectionElement">
      {/*Champion */}
      <img className="champion" alt="" src={championMastery.url}></img>
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
            src={getTokenSrc(championMastery.level + 1)}
          ></img>
          <img
            className="overlay-background"
            alt=""
            src={championMastery.url}
          ></img>
          <div className="token-amount">{championMastery.tokensEarned}</div>
        </div>
      )}

      {/*Mastery */}
      <img
        alt=""
        className="mastery"
        src={getMasterySrc(championMastery.level)}
      ></img>

      {/*Coffre */}
      {championMastery.chestGranted && (
        <img alt="" className="chest-icon" src={chestSrc()}></img>
      )}
    </div>
  );
}

import "./Styles/CollectionElement.scss";
import { Mastery, Champion } from "../type";
import { chestSrc, getMasterySrc, getTokenSrc } from "../imagesSrc";

type Props = { champion: Champion; mastery: Mastery };
export function CollectionElement({ champion, mastery }: Props) {
  return (
    <div className="lq-collectionElement">
      {/*Champion */}
      <img className="champion" alt="" src={champion.url}></img>
      <div className="champion-mastery-point">{mastery.championPoints} pts</div>

      {/*Token */}
      {mastery.tokensEarned > 0 && (
        <div className="token-block">
          <img
            alt=""
            className="token-overlay"
            src={getTokenSrc(mastery.championLevel + 1)}
          ></img>
          <img className="overlay-background" alt="" src={champion.url}></img>
          <div className="token-amount">{mastery.tokensEarned}</div>
        </div>
      )}

      {/*Mastery */}
      <img
        alt=""
        className="mastery"
        src={getMasterySrc(mastery.championLevel)}
      ></img>

      {/*Coffre */}
      {!mastery.chestGranted && (
        <img alt="" className="chest-icon" src={chestSrc()}></img>
      )}
    </div>
  );
}

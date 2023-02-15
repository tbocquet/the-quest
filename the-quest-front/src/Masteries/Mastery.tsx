import "./Styles/Mastery.scss";
import "./Styles/Mastery-gradient.scss";
import { ChampionMastery } from "../type";
import {
  getChampionTile,
  getChampionSmallTile,
  getChestIcon,
  getChestIcon2,
  getMasteryIcon,
  getTokenIcon2,
  getMasteryOverlay,
  getMasteryToken,
} from "../imageGetter";

type Props = {
  championMastery: ChampionMastery;
};
export function Mastery({ championMastery }: Props) {
  function getBooleanMap(M: ChampionMastery) {
    if (M.level === 6) {
      let j = 0;
      let res: boolean[] = [];
      for (let i = 0; i < 3; i++) {
        if (j < M.tokensEarned) {
          res = [...res, true];
        } else {
          res = [...res, false];
        }
        j++;
      }
      return res;
    }
    if (M.level === 5) {
      let j = 0;
      let res: boolean[] = [];
      for (let i = 0; i < 2; i++) {
        if (j < M.tokensEarned) {
          res = [...res, true];
        } else {
          res = [...res, false];
        }
        j++;
      }
      return res;
    }
    return [];
  }

  return (
    <div className="lq-mastery">
      {/*Image champion */}
      <div className="champion-img-container">
        <img
          className="champion-img"
          alt=""
          src={getChampionTile(championMastery.id)}
        ></img>
      </div>

      {/*Icon Mastery */}
      <img
        alt=""
        className="mastery-icon"
        src={getMasteryIcon(championMastery.level)}
      ></img>

      {/*Icon Coffre*/}

      <div className="chest-icon-container">
        <img
          alt=""
          className="chest-icon"
          src={getChestIcon2(championMastery.chestGranted)}
        ></img>
      </div>

      {/* Point de maitrise */}
      {championMastery.level > 4 ? (
        <div className="champion-mastery-point">
          {championMastery.points.toLocaleString()} pts
        </div>
      ) : (
        <div className="champion-mastery-point">
          {championMastery.pointsSinceLastLevel.toLocaleString()}
          {" / "}
          {(
            championMastery.pointsSinceLastLevel +
            championMastery.pointsUntilNextLevel
          ).toLocaleString()}{" "}
          pts
        </div>
      )}

      {/* Nom du champion */}
      <div
        className={
          "gradient-M" + championMastery.level + "-back champion-name-container"
        }
      >
        <div
          className={
            "gradient-M" + championMastery.level + "-front champion-name"
          }
        >
          {championMastery.name}
        </div>
      </div>

      {/*Token */}

      {(championMastery.level === 5 || championMastery.level === 6) && (
        <div className="token-container">
          {getBooleanMap(championMastery).map((mybool, index) => (
            <img
              alt=""
              className="token-mastery"
              key={index}
              src={getMasteryToken(championMastery.level + 1, mybool)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

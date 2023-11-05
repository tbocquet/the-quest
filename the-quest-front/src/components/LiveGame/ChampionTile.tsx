import {
  getChampionTileById,
  getChestIcon2,
  getMasteryIcon,
  getMasteryToken,
} from "@/services/imageGetter";
import style from "./styles/ChampionTile.module.scss";
import "../Masteries/Styles/Mastery-gradient.scss";
import { numberAbrevier } from "@/utils/textDataTransformer";
import { getChampionNameFromId } from "@/services/masteries";

type Props = {
  championId: number;
  masteryLvl: number;
  masteryPoint: number;
  tokens: number;
  chestGranted: boolean;
};
export function ChampionTile({
  championId,
  masteryLvl,
  masteryPoint,
  tokens,
  chestGranted,
}: Props) {
  function getBooleanMap(level: number, token: number) {
    if (level === 6) {
      let j = 0;
      let res: boolean[] = [];
      for (let i = 0; i < 3; i++) {
        if (j < token) {
          res = [...res, true];
        } else {
          res = [...res, false];
        }
        j++;
      }
      return res;
    }
    if (level === 5) {
      let j = 0;
      let res: boolean[] = [];
      for (let i = 0; i < 2; i++) {
        if (j < token) {
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
    <a
      className={style.championTile}
      rel="noopener noreferrer"
      target="_blank"
      href={`https://leagueoflegends.fandom.com/wiki/${getChampionNameFromId(
        championId
      ).replace(" ", "_")}/LoL`}
    >
      <div className={style.championTile}>
        {/*Image champion */}
        <div className={style.championImgContainer}>
          <img alt="" src={getChampionTileById(championId)}></img>
        </div>

        {/*Icon Mastery */}
        <img
          alt=""
          className={style.masteryIcon}
          src={getMasteryIcon(masteryLvl)}
        ></img>

        {/*Icon Coffre*/}

        <div className={style.chestIconContainer}>
          <img
            alt=""
            className={style.chestIcon}
            src={getChestIcon2(chestGranted)}
          ></img>
        </div>

        {/* Mastery point */}
        <div
          className={`gradient-M${masteryLvl}-back ${style.masteryPointContainer}`}
        >
          <div
            className={`gradient-M${masteryLvl}-front ${style.masteryPoint}`}
          >
            {numberAbrevier(masteryPoint)} points
          </div>
        </div>

        {/*Token */}

        {(masteryLvl === 5 || masteryLvl === 6) && (
          <div className={style.tokenContainer}>
            {getBooleanMap(masteryLvl, tokens).map((mybool, index) => (
              <img
                alt=""
                className={style.tokenMastery}
                key={index}
                src={getMasteryToken(masteryLvl + 1, mybool)}
              />
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

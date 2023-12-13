import { numberAbrevier } from "@/utils/textDataTransformer";
import style from "./styles/ChampionStats.module.scss";
import Tooltip from "./Tooltip";
import { PoroChampionStats } from "@/models/porofessor";
import { getMasteryToken } from "@/services/imageGetter";

type Props = {
  championStats: PoroChampionStats | null;
  masteryLvl: number;
  masteryPoint: number;
  tokens: number;
};

export default function ChampionStats({
  championStats,
  masteryPoint,
  masteryLvl,
  tokens,
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
    <div className={style.championStats}>
      {/* Mastery point && Token */}
      <div
        className={`gradient-M${masteryLvl}-back ${style.PointAndTokenContainer}`}
      >
        <div
          className={`gradient-M${masteryLvl}-front ${style.PointAndTokenGradient}`}
        >
          {/* Points */}
          <div className={style.MPoint}>
            {numberAbrevier(masteryPoint)} points
          </div>
          {/* Tokens */}
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
      </div>

      {/* KDA */}
      <div className={style.kda}>
        <Tooltip direction="bottom" content={"kills / deaths / assists"}>
          {championStats && championStats.kills ? (
            <>
              <span className={style.kills}>{championStats.kills}</span>
              {` / `}
              <span className={style.deaths}>{championStats.deaths}</span>
              {` / `}
              <span className={style.assists}>{championStats.assists}</span>
            </>
          ) : (
            <span>- / - / -</span>
          )}
        </Tooltip>
      </div>

      {/* Winrate du champion */}
      {championStats && championStats.kills ? (
        <div className={style.games}>
          <span className={style.winrate}>{championStats.winrate}%</span>
          <span className={style.gameAmount}>
            ({championStats.gameAmount}{" "}
            {championStats.gameAmount > 1 ? "jouées" : "jouée"})
          </span>
        </div>
      ) : (
        <div className={style.games}>
          <span className={style.winrate}> - </span>
          <span className={style.gameAmount}>(0 jouée)</span>
        </div>
      )}
    </div>
  );
}

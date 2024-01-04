import { numberAbrevier } from "@/utils/textDataTransformer";
import Tooltip from "./Tooltip";
import { PoroChampionStats } from "@/models/Porofessor";
import { getMasteryIcon, getMasteryToken } from "@/services/imageGetter";

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
    <div className="flex flex-col items-start text-sm pl-1">
      {/* Champion Mastery , Points, Tokens*/}

      <div
        className={`gradient-M${masteryLvl}-back flex flex-row items-center px-1 rounded min-w-[10.5rem] gap-2`}
      >
        <img alt="" className="w-7" src={getMasteryIcon(masteryLvl)}></img>
        <div className="font-bold">{numberAbrevier(masteryPoint)} pts</div>

        {/* Tokens */}
        {(masteryLvl === 5 || masteryLvl === 6) && (
          <div className="flex flex-row items-center gap-1">
            {getBooleanMap(masteryLvl, tokens).map((mybool, index) => (
              <img
                alt=""
                className="w-3 h-3 object-contain"
                key={index}
                src={getMasteryToken(masteryLvl + 1, mybool)}
              />
            ))}
          </div>
        )}
      </div>

      {/* KDA */}

      <Tooltip direction="bottom" content={"kills / deaths / assists"}>
        {championStats && championStats.kills ? (
          <div className="pl-1">
            <span className="text-green-400">{championStats.kills}</span>
            {` / `}
            <span className="text-red-400">{championStats.deaths}</span>
            {` / `}
            <span className="text-yellow-400">{championStats.assists}</span>
          </div>
        ) : (
          <span>- / - / -</span>
        )}
      </Tooltip>

      {/* Winrate du champion */}
      {championStats && championStats.kills ? (
        <div className="flex flex-row items-center pl-1 gap-2">
          <span className="font-bold">{championStats.winrate}%</span>
          <span className="text-yellow1">
            {`(${championStats.gameAmount}
             ${championStats.gameAmount > 1 ? "jouées" : "jouée"})`}
          </span>
        </div>
      ) : (
        <div className="text-yellow1">
          <span> - </span>
          <span>(0 jouée)</span>
        </div>
      )}
    </div>
  );
}

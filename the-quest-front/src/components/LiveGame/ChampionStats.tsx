import style from "./styles/ChampionStats.module.scss";
import { getSummonerSpell } from "@/services/imageGetter";
import Tooltip from "./Tooltip";
import { PoroChampionStats } from "@/models/porofessor";

type Props = {
  championStats: PoroChampionStats | null;
  idSumSpell1: number;
  idSumSpell2: number;
};

export default function ChampionStats({
  championStats,
  idSumSpell1,
  idSumSpell2,
}: Props) {
  return (
    <div className={style.championStats}>
      <div className={style.stats}>
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
      {/* Summoner Spells */}
      <div className={style.summonerSpells}>
        <img alt="" src={getSummonerSpell(idSumSpell1)} />

        <img alt="" src={getSummonerSpell(idSumSpell2)} />
      </div>
    </div>
  );
}

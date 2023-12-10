import style from "./styles/League.module.scss";
import { getRankedIcon, getUnrankedIcon } from "@/services/imageGetter";
import { firstLetterUpperCase } from "@/utils/textDataTransformer";
import Tooltip from "./Tooltip";
import { LolAPISummonerLeague } from "@/models/LiveGame";

type Props = {
  league: LolAPISummonerLeague | null;
};
export function League({ league }: Props) {
  if (league === null || league === undefined)
    return (
      <div className={style.leagueInfo}>
        <img
          alt="league icon"
          className={style.tierIcon}
          src={getUnrankedIcon()}
        />
        <div className={style.textInfo}>
          <div>
            <span>Unranked</span>
          </div>
        </div>
      </div>
    );

  const winrate = Math.floor(
    (league.wins / (league.losses + league.wins)) * 100
  );
  return (
    <div className={style.leagueInfo}>
      {league.tier && (
        <img
          alt="league icon"
          className={style.tierIcon}
          src={getRankedIcon(league.tier)}
        />
      )}
      <div className={style.textInfo}>
        <div className={style.rankDiv}>
          {league.tier && (
            <span className={style.rank}>
              {firstLetterUpperCase(league.tier.toLowerCase())}
            </span>
          )}

          {league.tier &&
            league.tier.toLowerCase() !== "master" &&
            league.tier.toLowerCase() !== "grandmaster" &&
            league.tier.toLowerCase() !== "challenger" && (
              <span className={style.division}>{league.rank}</span>
            )}
          <span className={style.lp}>{league.leaguePoints} LP</span>
        </div>
        <Tooltip
          content={`${league.wins} victoire${league.wins > 1 && "s"} ${
            league.losses
          } defaite${league.losses > 1 && "s"}`}
          direction="bottom"
        >
          <div className={style.winrateDiv}>
            <span className={style.winrate}>{winrate}%</span>
            <span className={style.gameAmount}>
              ({league.wins + league.losses} jouées)
            </span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

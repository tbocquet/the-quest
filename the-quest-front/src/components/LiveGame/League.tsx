import { LolAPISummonerLeague } from "@/models/liveGame";
import style from "./styles/League.module.scss";
import { getRankedIcon, getUnrankedIcon } from "@/services/imageGetter";
import { firstLetterUpperCase } from "@/utils/textDataTransformer";

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
      <img
        alt="league icon"
        className={style.tierIcon}
        src={getRankedIcon(league.tier)}
      />
      <div className={style.textInfo}>
        <div>
          <span>{firstLetterUpperCase(league.tier.toLowerCase())}</span>
          {league.tier.toLowerCase() !== "master" &&
            league.tier.toLowerCase() !== "grandmaster" &&
            league.tier.toLowerCase() !== "challenger" && (
              <span>{league.rank}</span>
            )}
          <span>{league.leaguePoints} LP</span>
        </div>
        <div>
          <span>{winrate}%</span>
          <span>({league.wins + league.losses} jouées)</span>
        </div>
      </div>
    </div>
  );
}

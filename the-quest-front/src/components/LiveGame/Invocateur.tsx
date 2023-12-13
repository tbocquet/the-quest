import { LiveGameParticipant } from "@/models/LiveGame";
import { Link } from "react-router-dom";
import style from "./styles/Invocateur.module.scss";
import { getCDragonSummonerIcon } from "@/services/imageGetter";
import Tooltip from "./Tooltip";
import {
  numberAbrevier,
  rendreNombreLisible,
} from "@/utils/textDataTransformer";

type Props = {
  sum: LiveGameParticipant;
};
export default function Invocateur({ sum }: Props) {
  return (
    <div className={style.summonerInfo}>
      {/* Invocateur Icon */}
      <Link to={`/invocateur/${sum.gameName}/${sum.tagLine}`}>
        <div className={style.profileIconContainer}>
          <img
            alt="summoner icon"
            src={getCDragonSummonerIcon(sum.profileIconId)}
          />
          {sum.porofessorStats && (
            <Tooltip
              content={`Niveau de l'invocateur : ${sum.porofessorStats.level}`}
              direction="bottom"
            >
              <span className={style.summonerLevel}>
                {sum.porofessorStats?.level}
              </span>
            </Tooltip>
          )}
        </div>
      </Link>
      {/* Pseudo et masteries  */}
      <div className={style.pseudoAndMasteries}>
        <Link
          className={style.summonerName}
          to={`/invocateur/${sum.gameName}/${sum.tagLine}`}
        >
          {sum.gameName} <span className={style.tag}>#{sum.tagLine}</span>
        </Link>

        <div className={style.masteriesStats}>
          {sum.masteries && (
            <Tooltip content={`Progression dans la quête`} direction="bottom">
              <span className={style.theQuestProgression}>
                {sum.masteries.progression}%
              </span>
            </Tooltip>
          )}
          {sum.masteries && (
            <Tooltip
              content={`Nombre de points de maitrise : ${rendreNombreLisible(
                sum.masteries.totalPoint
              )}`}
              direction="bottom"
            >
              <span className={style.totalMasteryPoint}>
                ({numberAbrevier(sum.masteries.totalPoint)} points)
              </span>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

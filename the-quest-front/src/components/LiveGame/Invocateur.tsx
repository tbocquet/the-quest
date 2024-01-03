import { LiveGameParticipant } from "@/models/LiveGame";
import { Link } from "react-router-dom";
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
    <div className="flex flex-row items-center gap-2">
      {/* Invocateur Icon */}
      <Link to={`/invocateur/${sum.gameName}/${sum.tagLine}`}>
        <div className="relative w-12 h-12">
          <img
            className="w-12 h-12"
            alt="summoner icon"
            src={getCDragonSummonerIcon(sum.profileIconId)}
          />
          {sum.porofessorStats && (
            <div className="absolute font-bold text-xs bottom-0 rounded px-[2px] bg-gray-900/50">
              <Tooltip
                content={`Niveau de l'invocateur : ${sum.porofessorStats.level}`}
                direction="bottom"
              >
                <span>{sum.porofessorStats?.level}</span>
              </Tooltip>
            </div>
          )}
        </div>
      </Link>

      {/* Pseudo et masteries  */}
      <div className="flex flex-col items-start">
        <Link className="" to={`/invocateur/${sum.gameName}/${sum.tagLine}`}>
          <p className="text-sm max-w-44 truncate">
            <span className="text-base font-bold">{sum.gameName}</span>
            <span className="text-yellow1">#{sum.tagLine}</span>
          </p>
        </Link>

        <div className="flex flex-row gap-1 items-center text-yellow1">
          {sum.masteries && (
            <Tooltip content={`Progression dans la quête`} direction="bottom">
              <span className="font-bold text-sm">
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
              <span className="text-sm">
                ({numberAbrevier(sum.masteries.totalPoint)} points)
              </span>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

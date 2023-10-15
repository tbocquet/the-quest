import style from "./styles/LiveGameParticipant.module.scss";
import { getCDragonSummonerIcon } from "@/services/imageGetter";
import {
  numberAbrevier,
  rendreNombreLisible,
} from "@/utils/textDataTransformer";
import { League } from "./League";
import { ChampionTile } from "./ChampionTile";
import { Perks } from "./Perks";
import ChampionStats from "./ChampionStats";
import { SummonerTags } from "./SummonerTags";
import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";
import { LiveGameParticipant } from "@/models/LiveGame";

type Props = {
  sum: LiveGameParticipant;
  team: "blue" | "red";
};
export function GameParticipant({ sum, team }: Props) {
  const getSideStyle = team === "blue" ? style.blueSide : style.redSide;
  return (
    <div className={style.gameParticipant}>
      <div className={style.summonerRow + " " + getSideStyle}>
        {/* Invocateur */}
        <div className={style.summonerInfo}>
          {/* Invocateur Icon */}
          <Link to={`/invocateur/${sum.summonerName}`}>
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
            <span className={style.summonerName}>{sum.summonerName}</span>

            {sum.masteries && (
              <Tooltip
                content={`Progression dans la quête : ${sum.masteries.progression}%`}
                direction="bottom"
              >
                <span className={style.theQuestProgression}>
                  {sum.masteries.progression} %
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
                  {numberAbrevier(sum.masteries.totalPoint)} points
                </span>
              </Tooltip>
            )}
          </div>
        </div>
        {/* League */}

        <div>
          <League league={sum.leagues ? sum.leagues[0] : null} />
          <League league={sum.leagues ? sum.leagues[1] : null} />
        </div>

        {/* Champion */}
        <ChampionTile
          championId={sum.championId}
          masteryLvl={sum.masteries ? sum.masteries.championLevel : 0}
          masteryPoint={sum.masteries ? sum.masteries.championPoint : 0}
          tokens={sum.masteries ? sum.masteries.championToken : 0}
          chestGranted={sum.masteries ? sum.masteries.chestGranded : true}
        />

        {/* Champion Stats */}
        <ChampionStats
          championStats={
            sum.porofessorStats ? sum.porofessorStats.championStats : null
          }
          idSumSpell1={sum.spell1Id}
          idSumSpell2={sum.spell2Id}
        />

        {/* Runes */}
        <div className={style.perksInfo}>
          <Perks perks={sum.perks} />
        </div>
      </div>
      {/* Tags */}
      <div className={style.tagsContainer}>
        {sum.porofessorStats && (
          <SummonerTags tags={sum.porofessorStats?.tags} />
        )}
      </div>
    </div>
  );
}

import { LiveGameParticipant } from "@/models/liveGame";
import style from "./styles/LiveGameParticipant.module.scss";
import { getCDragonSummonerIcon } from "@/services/imageGetter";
import { numberAbrevier } from "@/utils/textDataTransformer";
import { League } from "./League";
import { ChampionTile } from "./ChampionTile";
import { Perks } from "./Perks";
import ChampionStats from "./ChampionStats";
import { SummonerTags } from "./SummonerTags";

type Props = {
  sum: LiveGameParticipant;
};
export function GameParticipant({ sum }: Props) {
  return (
    <div className={style.gameParticipant}>
      <div className={style.summonerRow}>
        {/* Invocateur */}
        <div className={style.summonerInfo}>
          {/* Invocateur Icon */}
          <div className={style.profileIconContainer}>
            <img
              alt="summoner icon"
              src={getCDragonSummonerIcon(sum.profileIconId)}
            />
            {sum.porofessorStats && <span>{sum.porofessorStats?.level}</span>}
          </div>
          {/* Pseudo et masteries  */}
          <div className={style.pseudoAndMasteries}>
            <span className={style.summonerName}>{sum.summonerName}</span>

            {sum.masteries && (
              <span className={style.theQuestProgression}>
                {sum.masteries.progression} %
              </span>
            )}
            {sum.masteries && (
              <span className={style.totalMasteryPoint}>
                {numberAbrevier(sum.masteries.totalPoint)} points
              </span>
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

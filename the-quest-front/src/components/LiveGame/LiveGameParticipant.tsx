import style from "./styles/LiveGameParticipant.module.scss";

import { League } from "./League";
import { SummonerTags } from "./SummonerTags";
import Tooltip from "./Tooltip";
import { LiveGameParticipant } from "@/models/LiveGame";
import Invocateur from "./Invocateur";
import ChampionBlock from "./ChampionBlock";
import { Perks } from "./Perks";
import { getSummonerSpell } from "@/services/imageGetter";

type Props = {
  sum: LiveGameParticipant;
  team: "blue" | "red";
};
export function GameParticipant({ sum, team }: Props) {
  const getSideStyle = team === "blue" ? style.blueSide : style.redSide;
  const soloQ = sum.leagues?.find(
    (league) => league.queueType === "RANKED_SOLO_5x5"
  );
  const flexQ = sum.leagues?.find(
    (league) => league.queueType === "RANKED_FLEX_SR"
  );
  return (
    <div className={style.gameParticipant}>
      <div className={style.summonerRow + " " + getSideStyle}>
        {/* Invocateur */}
        <Invocateur sum={sum} />

        {/* League */}

        <div className={style.leagueStats}>
          <Tooltip content={"Classement Solo/Duo"} direction={"left"}>
            <League league={sum.leagues && soloQ ? soloQ : null} />
          </Tooltip>
          <div className={style.flex}>
            <Tooltip content={"Classsement Flex"} direction={"left"}>
              <League league={sum.leagues && flexQ ? flexQ : null} />
            </Tooltip>
          </div>
        </div>

        {/* Champion */}
        <ChampionBlock
          championStats={
            sum.porofessorStats ? sum.porofessorStats.championStats : null
          }
          championId={sum.championId}
          masteryLvl={sum.masteries ? sum.masteries.championLevel : 0}
          masteryPoint={sum.masteries ? sum.masteries.championPoint : 0}
          tokens={sum.masteries ? sum.masteries.championToken : 0}
          chestGranted={sum.masteries ? sum.masteries.chestGranded : true}
        />

        {/* Runes */}
        <div className={style.PerksAndSummoners}>
          {/* Summoner Spells */}

          <Perks perks={sum.perks} />
          <div className={style.summonerSpells}>
            <img alt="" src={getSummonerSpell(sum.spell1Id)} />

            <img alt="" src={getSummonerSpell(sum.spell2Id)} />
          </div>
        </div>

        {/* Tags */}
        <div className={style.tagsContainer}>
          {sum.porofessorStats && (
            <SummonerTags tags={sum.porofessorStats?.tags} />
          )}
        </div>
      </div>
    </div>
  );
}

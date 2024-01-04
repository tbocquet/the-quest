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
  const bgColor = team === "blue" ? "border-blue-500/20" : "border-red-500/20";

  const bg =
    "w-full rounded " + (team === "blue" ? "bg-blue-500/10" : "bg-red-500/10");
  const soloQ = sum.leagues?.find(
    (league) => league.queueType === "RANKED_SOLO_5x5"
  );
  const flexQ = sum.leagues?.find(
    (league) => league.queueType === "RANKED_FLEX_SR"
  );
  return (
    <div className="h-[25rem]">
      <div
        className={
          "flex flex-col p-1 items-center gap-1 rounded border-4 border-double w-[16rem] text-white mx-2 " +
          bgColor
        }
      >
        {/* Invocateur */}
        <div className={bg}>
          <Invocateur sum={sum} />
        </div>

        {/* League */}

        <div className={"flex flex-col items-start " + bg}>
          <Tooltip content={"Classement Solo/Duo"} direction={"left"}>
            <League league={sum.leagues && soloQ ? soloQ : null} />
          </Tooltip>

          <Tooltip content={"Classsement Flex"} direction={"left"}>
            <League league={sum.leagues && flexQ ? flexQ : null} />
          </Tooltip>
        </div>

        {/* Champion */}
        <div className={bg}>
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
        </div>

        {/* Runes */}
        <div
          className={"flex flex-row flex-wrap justify-center gap-8 py-1 " + bg}
        >
          {/* Summoner Spells */}

          <Perks perks={sum.perks} />
          <div className="flex flex-col justify-center gap-2">
            <img alt="" className="w-7" src={getSummonerSpell(sum.spell1Id)} />
            <img alt="" className="w-7" src={getSummonerSpell(sum.spell2Id)} />
          </div>
        </div>

        {/* Tags */}
        <div className={"py-1 " + bg}>
          {sum.porofessorStats && (
            <SummonerTags tags={sum.porofessorStats?.tags} />
          )}
        </div>
      </div>
    </div>
  );
}

import { PoroChampionStats } from "@/models/porofessor";
import { ChampionTile } from "./ChampionTile";
import ChampionStats from "./ChampionStats";
import style from "./styles/ChampionBlock.module.scss";

type Props = {
  championId: number;
  masteryLvl: number;
  masteryPoint: number;
  tokens: number;
  chestGranted: boolean;
  championStats: PoroChampionStats | null;
};
export default function ChampionBlock({
  championId,
  masteryLvl,
  masteryPoint,
  tokens,
  chestGranted,
  championStats,
}: Props) {
  return (
    <div className={style.ChampionBlock}>
      {/* Tile */}
      <ChampionTile
        championId={championId}
        masteryLvl={masteryLvl}
        chestGranted={chestGranted}
      />
      {/* Stats */}
      <ChampionStats
        championStats={championStats}
        masteryLvl={masteryLvl}
        masteryPoint={masteryPoint}
        tokens={tokens}
      />
    </div>
  );
}

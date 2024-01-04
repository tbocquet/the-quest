import { PoroChampionStats } from "@/models/Porofessor";
import { ChampionTile } from "./ChampionTile";
import ChampionStats from "./ChampionStats";

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
    <div className="flex flex-row items-center pl-1">
      {/* Tile */}
      <ChampionTile championId={championId} chestGranted={chestGranted} />
      {/*Icon Mastery */}
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

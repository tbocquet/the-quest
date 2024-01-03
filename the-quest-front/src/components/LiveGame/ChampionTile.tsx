import { getChampionTileById, getChestIcon2 } from "@/services/imageGetter";
import "../Masteries/Styles/Mastery-gradient.scss";
import { getChampionNameFromId } from "@/services/masteries";

type Props = {
  championId: number;
  chestGranted: boolean;
};
export function ChampionTile({ championId, chestGranted }: Props) {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={`https://leagueoflegends.fandom.com/wiki/${getChampionNameFromId(
        championId
      ).replace(" ", "_")}/LoL`}
    >
      <div className="relative w-16 border border-solid border-yellow1">
        {/*Image champion */}
        <img alt="" src={getChampionTileById(championId)}></img>

        {/*Icon Coffre*/}

        <div className="absolute rounded top-0 right-0 w-[0.9rem] h-[0.9rem] overflow-hidden">
          <div className="absolute w-6 h-6 left-[-0.27rem] top-[-0.26rem] bg-red-50">
            <img alt="" className="" src={getChestIcon2(chestGranted)}></img>
          </div>
        </div>
      </div>
    </a>
  );
}

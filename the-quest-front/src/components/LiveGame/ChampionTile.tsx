import {
  getChampionTileById,
  getChestIcon2,
  getMasteryIcon,
} from "@/services/imageGetter";
import style from "./styles/ChampionTile.module.scss";
import "../Masteries/Styles/Mastery-gradient.scss";
import { getChampionNameFromId } from "@/services/masteries";

type Props = {
  championId: number;
  masteryLvl: number;
  chestGranted: boolean;
};
export function ChampionTile({ championId, masteryLvl, chestGranted }: Props) {
  return (
    <a
      className={style.championTile}
      rel="noopener noreferrer"
      target="_blank"
      href={`https://leagueoflegends.fandom.com/wiki/${getChampionNameFromId(
        championId
      ).replace(" ", "_")}/LoL`}
    >
      <div className={style.championTile}>
        {/*Image champion */}
        <div className={style.championImgContainer}>
          <img alt="" src={getChampionTileById(championId)}></img>
        </div>

        {/*Icon Mastery */}
        <img
          alt=""
          className={style.masteryIcon}
          src={getMasteryIcon(masteryLvl)}
        ></img>

        {/*Icon Coffre*/}

        <div className={style.chestIconContainer}>
          <img
            alt=""
            className={style.chestIcon}
            src={getChestIcon2(chestGranted)}
          ></img>
        </div>
      </div>
    </a>
  );
}

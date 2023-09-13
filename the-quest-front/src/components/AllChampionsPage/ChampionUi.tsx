import "./Styles/championUi.scss";
import { Champion } from "@/models/type";
import { getChampionTile } from "@/services/imageGetter";

type Props = {
  championData: Champion;
};
export function ChampionUi({ championData }: Props) {
  return (
    <div className="champion-ui">
      {/*Image champion */}
      <div className="champion-img-container">
        <img
          className="champion-img"
          alt=""
          src={getChampionTile(championData.id)}
        ></img>
      </div>

      {/* Nom du champion */}
      <div className={"champion-name-container"}>
        <div className={"champion-name"}>{championData.name}</div>
      </div>
    </div>
  );
}

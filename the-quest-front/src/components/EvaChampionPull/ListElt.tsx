import { Champion, getChampionDataFromJson } from "@/models/Champion";
import "./style.scss";
import { getChampionTile } from "@/services/imageGetter";
type Props = {
  championId: string;
  toPlayWith: string[];
};

const championTile = (name: string, url: string) => (
  <div className="tile">
    <img src={url} alt="" />
    <h3>{name}</h3>
  </div>
);

export default function ListElt({ championId, toPlayWith }: Props) {
  const champ = getChampionDataFromJson(championId);
  return (
    <div className="list-elt">
      {champ
        ? championTile(champ.name, getChampionTile(champ.id))
        : "undefined"}

      <h4>{"= = >"}</h4>

      <ul>
        {toPlayWith.map((id) => {
          const c = getChampionDataFromJson(id);
          return c ? (
            <li key={id}>{championTile(c.name, getChampionTile(c.id))}</li>
          ) : (
            "undefined"
          );
        })}
      </ul>
    </div>
  );
}

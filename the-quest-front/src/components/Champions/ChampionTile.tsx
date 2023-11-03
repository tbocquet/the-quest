import { Champion } from "@/models/Champion";
import "./styles/ChampionTile.scss";
import {
  getChampionSplashesById,
  getLaneIcon,
  getRegionIcon,
  getRoleIcon,
} from "@/services/imageGetter";

type Props = { data: Champion };
export default function ChampionTile({ data }: Props) {
  return (
    <div className="champion-tile">
      <img
        className="champion-image"
        alt=""
        src={getChampionSplashesById(parseInt(data.key))}
      />

      <div className="champion-info-block">
        <h3 className="champion-name">{data.name}</h3>

        <div className="champion-info">
          {/* Regions */}
          <div className="line-info-block">
            {/* Icon */}
            <div className="icons-line">
              {data.region.map((tag) => (
                <img
                  alt="Region icon"
                  key={tag + "_icon_index"}
                  src={getRegionIcon(tag)}
                />
              ))}
            </div>
            {/* Text */}
            <div className="text-line">
              {data.region.map((tag, index) => (
                <p key={tag + "_index"}>
                  {tag}
                  {index < data.region.length - 1 && <>&nbsp;/&nbsp;</>}
                </p>
              ))}
            </div>
          </div>

          {/* Rôles */}
          <div className="line-info-block">
            <div className="icons-line">
              {data.tags.map((tag) => (
                <img
                  alt="Rôle icon"
                  key={tag + "_icon_index"}
                  src={getRoleIcon(tag)}
                />
              ))}
            </div>
            <div className="text-line">
              {data.tags.map((tag, index) => (
                <p key={tag + "_index"}>
                  {tag}
                  {index < data.tags.length - 1 && <>&nbsp;/&nbsp;</>}
                </p>
              ))}
            </div>
          </div>

          {/* Lanes */}
          <div className="line-info-block">
            <div className="icons-line">
              {data.lane.map((lane) => (
                <img
                  alt="Lane icon"
                  key={lane + "_icon_index"}
                  src={getLaneIcon(lane)}
                />
              ))}
            </div>
            <div className="text-line">
              {data.lane.map((lane, index) => (
                <p key={lane + "_index"}>
                  {lane}
                  {index < data.lane.length - 1 && <>&nbsp;/&nbsp;</>}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

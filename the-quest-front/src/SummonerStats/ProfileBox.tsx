/*View contenant les informations de base sur un invocateur : Icon de profil, pseudo, niveau et statistiques de ranked*/

import "./Styles/ProfileBox.scss";
import { QStatistics } from "./QStatistics";
import { SummonerData } from "../type";
import { getSummonerIcon, getSummonerDefaultProfileIcon } from "../imageGetter";

type Props = { sumData: SummonerData };

export function ProfileBox({ sumData }: Props) {
  return (
    <div className="summoner-info-block">
      <div>
        <img
          src={getSummonerIcon(sumData.profileIconId)}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = getSummonerDefaultProfileIcon();
          }}
          alt=""
          className="summoner-icon"
        />
      </div>

      <div className="summoner-rank-infos">
        <div className="summoner-name">{sumData.name}</div>
        <h4>Niveau {sumData.summonerLevel}</h4>
        {sumData.ranks.map((Q, index) => (
          <QStatistics Q={Q} key={index} />
        ))}
      </div>
    </div>
  );
}

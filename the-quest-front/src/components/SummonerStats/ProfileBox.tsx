/*View contenant les informations de base sur un invocateur : Icon de profil, pseudo, niveau et statistiques de ranked*/

import "./Styles/ProfileBox.scss";
import { QStatistics } from "./QStatistics";
import {
  getCDragonSummonerIcon,
  getSummonerDefaultProfileIcon,
} from "@/services/imageGetter";
import { SummonerData } from "@/models/Summoner";
import useSWR from "swr";
import { getSummonerLeagues } from "@/services/summonerRankedStats";
import { SummonerLeague } from "@/models/SummonerLeague";
import Tooltip from "../LiveGame/Tooltip";

type Props = { sumData: SummonerData };

export function ProfileBox({ sumData }: Props) {
  const { data, error, isLoading } = useSWR(sumData.id, getSummonerLeagues);
  const leagueData = data as SummonerLeague[];

  // useEffect(() => console.log(sumData), [sumData]);
  return (
    <div className="summoner-info-block">
      <div className="summoner-icon-container">
        <img
          src={getCDragonSummonerIcon(sumData.profileIconId)}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = getSummonerDefaultProfileIcon();
          }}
          alt=""
          className="summoner-icon"
        />
        <Tooltip direction="bottom" content={"Niveau de l'invocateur"}>
          <h4 className="summoner-level">{sumData.summonerLevel}</h4>
        </Tooltip>
      </div>

      <div className="summoner-rank-infos">
        <div className="summoner-name">{sumData.name}</div>
        {!isLoading &&
          !error &&
          leagueData.map((league, index) => (
            <QStatistics league={league} key={index} />
          ))}
      </div>
    </div>
  );
}

/*View contenant toutes les informations sur un Invocateur*/
/*Effectue tous les calls API necessaires pour ses enfants */

import { ChampionMastery } from "@/type";
import { ProfileBox } from "./ProfileBox";
import { QuestStatistics } from "./QuestStatistics";
import { SummonerData } from "@/type";
import "./Styles/SummonerStats.scss";

type Props = {
  summonerData: SummonerData;
  summonerMasteries: ChampionMastery[];
};

export function SummonerStats({ summonerData, summonerMasteries }: Props) {
  return (
    <div className="lq-sucessContainer">
      <ProfileBox sumData={summonerData} />
      <QuestStatistics masteries={summonerMasteries} />
    </div>
  );
}

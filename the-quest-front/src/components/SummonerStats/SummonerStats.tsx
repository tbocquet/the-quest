/*View contenant toutes les informations sur un Invocateur*/
/*Effectue tous les calls API necessaires pour ses enfants */

import { ChampionMastery } from "@/models/ChampionMastery";
import { ProfileBox } from "./ProfileBox";
import { QuestStatistics } from "./QuestStatistics";
import { SummonerData } from "@/models/Summoner";
import "./Styles/SummonerStats.scss";
import { SummonerAccount } from "@/models/SummonerAccount";

type Props = {
  summonerAccount: SummonerAccount;
  summonerData: SummonerData;
  summonerMasteries: ChampionMastery[];
};

export function SummonerStats({
  summonerAccount,
  summonerData,
  summonerMasteries,
}: Props) {
  return (
    <div className="lq-sucessContainer">
      <ProfileBox summonerAccount={summonerAccount} sumData={summonerData} />
      <QuestStatistics masteries={summonerMasteries} />
    </div>
  );
}

/*View contenant toutes les informations sur un Invocateur*/
/*Effectue tous les calls API necessaires pour ses enfants */

import { Mastery } from "../type";
import { ProfileBox } from "./ProfileBox";
import { QuestStatistics } from "./QuestStatistics";
import { SummonerData } from "../type";
import { useEffect, useState } from "react";
import { getSummonerDataById } from "../API_call";
import "./Styles/SummonerStats.scss";

type Props = { summonerId: string; masteries: Mastery[] };

export function SummonerStats({ summonerId, masteries }: Props) {
  const [sumData, setSumData] = useState<SummonerData | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getSummonerDataById(summonerId)
      .then((res) => {
        setSumData(res);
        setError(false);
      })
      .catch(() => setError(true));
  }, [summonerId]);

  if (error) return <div>Summoner not found</div>;
  if (!sumData) return <div>Loading...</div>;
  return (
    <div className="lq-sucessContainer">
      <ProfileBox sumData={sumData} />
      <QuestStatistics masteries={masteries} />
    </div>
  );
}

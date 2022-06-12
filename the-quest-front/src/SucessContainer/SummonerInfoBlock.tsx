import { getSummonerInfo, getSummonerProfileIcon } from "../API_call";
import { useEffect, useState } from "react";
import { useSumList } from "../SumListContext";
import "./Styles/SummonerInfoBlock.scss";
import { RankInfo } from "./RankInfo";

type Rank = {
  queueType: string;
  tier: number;
  rank: string;
  wins: number;
  losses: number;
};

type SumData = {
  name: string;
  profileIconId: number;
  summonerLevel: number;
  ranks: Rank[];
};

type Props = { summonerName: string };

export function SummonerInfoBlock({ summonerName }: Props) {
  const [sumData, setSumData] = useState<SumData | null>(null);
  const [error, setError] = useState<boolean>(false);
  const { setSumList } = useSumList();

  useEffect(() => {
    getSummonerInfo(summonerName)
      .then((res) => {
        setSumData(res);
        setSumList(res);
        setError(false);
      })
      .catch(() => setError(true));
  }, [summonerName]);

  if (error) return <div>Summoner not found</div>;
  if (!sumData) return <div>Loading...</div>;
  return (
    <div className="summoner-info-block">
      <div>
        <img
          src={getSummonerProfileIcon(sumData.profileIconId)}
          alt=""
          className="summoner-icon"
        />
        <div className="summoner-name">{sumData.name}</div>
      </div>
      <div className="summoner-rank-infos">
        <h4>Niveau {sumData.summonerLevel}</h4>
        {sumData.ranks.map((Q) => (
          <RankInfo Q={Q} />
        ))}
      </div>
    </div>
  );
}

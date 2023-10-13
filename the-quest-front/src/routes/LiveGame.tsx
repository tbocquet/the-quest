import { LiveGame } from "@/components/LiveGame/LiveGame";

import { useParams } from "react-router-dom";

export function LiveGamePage() {
  const { summonerName } = useParams();

  return summonerName ? (
    <LiveGame summonerName={summonerName} persistant={false} />
  ) : (
    <div>Error : need to specifie a summoner name</div>
  );
}

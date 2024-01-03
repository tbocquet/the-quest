import { LiveGame } from "@/components/LiveGame/LiveGame";

import { useParams } from "react-router-dom";

export function LiveGamePage() {
  const { gameName, tagLine } = useParams();

  return gameName && tagLine ? (
    <LiveGame riotId={{ gameName, tagLine }} persistant={true} />
  ) : (
    <div>Error : need to specifie a summoner name and tag</div>
  );
}

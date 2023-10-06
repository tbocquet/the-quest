import { GameParticipant } from "@/components/LiveGame/LiveGameParticipant";
import { getLaneIcon } from "@/services/imageGetter";

import { getPersistantLiveGame } from "@/services/liveGame";
import style from "./styles/LiveGame.module.scss";

import useSWR from "swr";

export function LiveGame() {
  const { data, error, isLoading } = useSWR(
    "Jean Prank",
    getPersistantLiveGame
  );

  if (error || data === null || data === undefined)
    return <div>échec du chargement</div>;
  if (isLoading) return <div>chargement...</div>;

  const matchupArray = [
    { blue: data.participants[0], red: data.participants[5], lane: "top" },
    { blue: data.participants[1], red: data.participants[6], lane: "jungle" },
    { blue: data.participants[2], red: data.participants[7], lane: "mid" },
    { blue: data.participants[3], red: data.participants[8], lane: "adc" },
    { blue: data.participants[4], red: data.participants[9], lane: "support" },
  ];

  return (
    <>
      {matchupArray.map((matchup, index) => (
        <div className={style.matchup} key={index}>
          <GameParticipant sum={matchup.blue} />
          <img
            className={style.lane}
            alt="lane"
            src={getLaneIcon(matchup.lane)}
          />
          <GameParticipant sum={matchup.red} />
        </div>
      ))}
    </>
  );
}

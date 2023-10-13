import { GameParticipant } from "@/components/LiveGame/LiveGameParticipant";
import { getChampionTileById, getLaneIcon } from "@/services/imageGetter";

import {
  getLiveGameBySummonerName,
  getPersistantLiveGame,
} from "@/services/liveGame";
import style from "./styles/LiveGame.module.scss";

import useSWR from "swr";
import { GameTimer } from "./GameTimer";
import { Loader } from "../Loader";
import { getQueue } from "@/utils/queue";

type Props = { summonerName: string; persistant?: boolean };
export function LiveGame({ summonerName, persistant = false }: Props) {
  const { data, error, isLoading } = useSWR(
    summonerName,
    persistant ? getPersistantLiveGame : getLiveGameBySummonerName
  );

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error || data === null || data === undefined)
    return (
      <div style={{ color: "white", margin: "3em" }}>
        {summonerName} n'est pas en jeu.
      </div>
    );

  const matchupArray = [
    { blue: data.participants[0], red: data.participants[5], lane: "top" },
    { blue: data.participants[1], red: data.participants[6], lane: "jungle" },
    { blue: data.participants[2], red: data.participants[7], lane: "mid" },
    { blue: data.participants[3], red: data.participants[8], lane: "adc" },
    { blue: data.participants[4], red: data.participants[9], lane: "support" },
  ];

  const blueTeamBans = data.bannedChampions.filter((ban) => ban.teamId === 100);
  const redTeamBans = data.bannedChampions.filter((ban) => ban.teamId === 200);

  return (
    <>
      {/* Timer et Queue */}
      <div className={style.timerAndQueue}>
        {getQueue(data.gameQueueConfigId)?.shortName}
        <span className={style.queue}>
          {data.gameStartTime && <GameTimer startTime={data.gameStartTime} />}
        </span>
      </div>

      {/* Bans */}
      {blueTeamBans && redTeamBans && (
        <div className={style.bansSection}>
          <div className={style.blueBans}>
            {blueTeamBans.map((ban, index) => (
              <div className={style.iconContainer} key={index}>
                <img
                  alt=""
                  className={style.bannedChampionIcon}
                  src={getChampionTileById(ban.championId)}
                />
              </div>
            ))}
          </div>
          <div className={style.redBans}>
            {redTeamBans.map((ban, index) => (
              <div className={style.iconContainer} key={index}>
                <img
                  alt=""
                  className={style.bannedChampionIcon}
                  src={getChampionTileById(ban.championId)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Joueurs */}
      {matchupArray.map((matchup, index) => (
        <div className={style.matchup} key={index}>
          <GameParticipant sum={matchup.blue} team="blue" />
          <img
            className={style.lane}
            alt="lane"
            src={getLaneIcon(matchup.lane)}
          />
          <GameParticipant sum={matchup.red} team="red" />
        </div>
      ))}
    </>
  );
}

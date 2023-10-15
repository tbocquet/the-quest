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
import { getQueue } from "@/utils/Queue";
import { LiveGameParticipant } from "@/models/LiveGame";

type Props = { summonerName: string; persistant?: boolean };
export function LiveGame({ summonerName, persistant = false }: Props) {
  const roles = ["top", "jungler", "mid", "adc", "support"];
  const lanes = ["top", "jungle", "mid", "adc", "support"];
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

  const blueTeam = data.participants.slice(0, 5);
  const redTeam = data.participants.slice(5, 10);

  function getParticipantByRole(
    role: string,
    participants: LiveGameParticipant[]
  ) {
    return participants.find(
      (P) =>
        P.porofessorStats && (P.porofessorStats.role.role as String) === role
    );
  }

  function getRoleSortedParticipants() {
    return roles.map((role, index) => {
      const blue = getParticipantByRole(role, blueTeam);
      const red = getParticipantByRole(role, redTeam);

      if (blue === undefined || red === undefined) return null;
      return {
        blue: blue,
        red: red,
        lane: lanes[index],
      };
    });
  }

  const sortedParticipants = getRoleSortedParticipants();

  const matchupArray = sortedParticipants.some((p) => p === null)
    ? lanes.map((lane, index) => ({
        blue: blueTeam[index],
        red: redTeam[index],
        lane: lane,
      }))
    : (sortedParticipants as {
        blue: LiveGameParticipant;
        red: LiveGameParticipant;
        lane: string;
      }[]);

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

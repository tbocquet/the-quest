/*View des statisiques d'une Queue*/

import { SummonerLeague } from "@/models/SummonerLeague";
import { getRankedIcon } from "@/services/imageGetter";
import "./styles/QStatistic.scss";
import React from "react";
import Tooltip from "../LiveGame/Tooltip";

type Props = {
  league: SummonerLeague;
};
export function QStatistics({ league }: Props) {
  if (
    league.queueType === "RANKED_SOLO_5x5" ||
    league.queueType === "RANKED_FLEX_SR"
  ) {
    return (
      <div className="summoner-rank-item">
        <img
          alt="icon"
          className={"summoner-rank-icon"}
          src={getRankedIcon(league.tier)}
        />
        <div>
          <h4>
            <strong>
              {league.tier} {league.rank}
            </strong>{" "}
            {league.leaguePoints} LP
            {league.queueType === "RANKED_SOLO_5x5" ? " (Solo/Duo)" : " (Flex)"}
          </h4>
          <Tooltip
            direction="bottom"
            content={`${league.wins} victoire${league.wins > 1 && "s"} ${
              league.losses
            } defaite${league.losses > 1 && "s"}`}
          >
            <p>
              Winrate :{" "}
              {Math.round(
                (league.wins * 1000) / (league.wins + league.losses)
              ) / 10}
              % ({league.wins + league.losses} jouée
              {league.wins + league.losses > 1 && "s"})
            </p>
          </Tooltip>
        </div>
      </div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}

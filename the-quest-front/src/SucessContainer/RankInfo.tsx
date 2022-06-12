import React from "react";

type Rank = {
  queueType: string;
  tier: number;
  rank: string;
  wins: number;
  losses: number;
};
type Props = {
  Q: Rank;
};
export function RankInfo({ Q }: Props) {
  if (Q.queueType === "RANKED_SOLO_5x5" || Q.queueType === "RANKED_FLEX_SR") {
    return (
      <div className="summoner-rank-item">
        <h4>
          {Q.queueType === "RANKED_SOLO_5x5" ? "Soloqueue " : "Flex "}: {Q.tier}{" "}
          {Q.rank}
        </h4>
        <p>
          {Q.wins} victoires (
          {Math.round((Q.wins * 1000) / (Q.wins + Q.losses)) / 10}
          %)
        </p>
      </div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}

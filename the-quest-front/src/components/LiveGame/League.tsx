import { getRankedIcon, getUnrankedIcon } from "@/services/imageGetter";
import { firstLetterUpperCase } from "@/utils/textDataTransformer";
import { LolAPISummonerLeague } from "@/models/LiveGame";

type Props = {
  league: LolAPISummonerLeague | null;
};
export function League({ league }: Props) {
  if (league === null || league === undefined)
    return (
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center justify-center w-12 h-12">
          <img alt="league icon" className="w-6" src={getUnrankedIcon()} />
        </div>
        <div className="text-sm">Unranked</div>
      </div>
    );
  const winrate = Math.floor(
    (league.wins / (league.losses + league.wins)) * 100
  );
  return (
    <div className="flex flex-row items-center gap-2">
      {league.tier && (
        <img
          alt="league icon"
          className="w-12 h-12 object-contain"
          src={getRankedIcon(league.tier)}
        />
      )}
      <div>
        <div className="flex flex-row justify-start items-center gap-2">
          {league.tier && (
            <span className="font-bold">
              {firstLetterUpperCase(league.tier.toLowerCase())}
            </span>
          )}

          {league.tier &&
            league.tier.toLowerCase() !== "master" &&
            league.tier.toLowerCase() !== "grandmaster" &&
            league.tier.toLowerCase() !== "challenger" && (
              <span>{league.rank}</span>
            )}
          <span className="text-sm text-yellow1">{league.leaguePoints} LP</span>
        </div>

        <div className="flex flex-row justify-start items-center gap-2 text-yellow1">
          <span className="text-sm font-bold">{winrate}%</span>
          <span className="text-sm">
            ({league.wins + league.losses} jouées)
          </span>
        </div>
      </div>
    </div>
  );
}

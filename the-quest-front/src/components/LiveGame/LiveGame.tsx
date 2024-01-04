import {
  getLiveGameByRiotId,
  getPersistantLiveGame,
} from "@/services/liveGame";

import useSWR from "swr";
import { Loader } from "../Loader";
import { RiotId } from "@/models/RiotId";
import { useLiveGameOptions } from "@/context/LiveGameOptionsContext";
import { LiveGameLayout } from "./LiveGameLayout";

type Props = { riotId: RiotId; persistant?: boolean };
export function LiveGame({ riotId, persistant = false }: Props) {
  const { queueOption, periodOption } = useLiveGameOptions();
  const { data, error, isLoading } = useSWR(
    [riotId, queueOption, periodOption],
    ([riotId, queueOption, periodOption]) =>
      persistant
        ? getPersistantLiveGame()
        : getLiveGameByRiotId(riotId, queueOption, periodOption),
    { revalidateOnFocus: false }
  );

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );

  if (error || data === null || data === undefined)
    return (
      <div style={{ color: "white", margin: "3em" }}>
        {riotId.gameName}#{riotId.tagLine} n'est pas en jeu.
      </div>
    );

  return <LiveGameLayout data={data} />;
}

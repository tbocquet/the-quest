import { useLiveGameOptions } from "@/context/LiveGameOptionsContext";
import "./styles/SelectOptions.scss";
export function SelectOptions() {
  const liveGameOptions = useLiveGameOptions();
  return (
    <div className="lg-select-option">
      <select
        value={liveGameOptions.queueOption}
        onChange={(e) => liveGameOptions.setQueueOption(e.target.value)}
      >
        <option value="">Normales et classées</option>
        <option value="ranked-only">Classées</option>
        <option value="flex">Solo/Duo</option>
        <option value="soloqueue">Flex</option>
      </select>

      <select
        value={liveGameOptions.periodOption}
        onChange={(e) => liveGameOptions.setPeriodOption(e.target.value)}
      >
        <option value="">30 derniers jours</option>
        <option value="season">Saison</option>
      </select>
    </div>
  );
}

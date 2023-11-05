import { Passive } from "@/models/ChampionDetails";
import { getPassiveIcon } from "@/services/imageGetter";

type Props = { spell: Passive };
export default function Skill({ spell }: Props) {
  return (
    <div className="champion-spell">
      <img alt={spell.name} src={getPassiveIcon(spell.image.full)} />
      <h3>{spell.name}</h3>
      <p>{spell.description}</p>
    </div>
  );
}

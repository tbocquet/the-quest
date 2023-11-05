import { Spell } from "@/models/ChampionDetails";
import { getSpellIcon } from "@/services/imageGetter";

type Props = { spell: Spell };
export default function Skill({ spell }: Props) {
  return (
    <div className="champion-spell">
      <img alt={spell.name} src={getSpellIcon(spell.image.full)} />
      <h3>{spell.name}</h3>
      <p>Délais de récupération : {spell.cooldown.join(" / ")}</p>
      <p>Coût : {spell.cost.join(" / ")}</p>
      <p>Range : {spell.range.join(" / ")}</p>
      <p>{spell.description}</p>
      <p>{spell.tooltip}</p>
    </div>
  );
}

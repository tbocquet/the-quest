import { Perks as Runes } from "@/models/liveGame";
import { getPerkSrc } from "@/services/imageGetter";
import style from "./styles/Perks.module.scss";
type Props = { perks: Runes };
export function Perks({ perks }: Props) {
  const mainPerk = perks.perkIds[0];
  const perkStyle = perks.perkIds.slice(1, 4);
  const perkSubstyle = perks.perkIds.slice(4, 6);
  const perkStatModes = perks.perkIds.slice(6, 9);

  return (
    <div className={style.perks}>
      <div className={style.mainPerk}>
        <img alt="" src={getPerkSrc(mainPerk)} />
      </div>
      <div className={style.runes}>
        <div className={style.perkStyle}>
          {perkStyle.map((id) => (
            <img alt="" key={id} src={getPerkSrc(id)} />
          ))}
        </div>
        <div className={style.perkSubStyle}>
          {perkSubstyle.map((id) => (
            <img alt="" key={id} src={getPerkSrc(id)} />
          ))}
        </div>
        <div className={style.perkStatModes}>
          {perkStatModes.map((id, index) => (
            <img alt="" key={`${id}_${index}`} src={getPerkSrc(id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

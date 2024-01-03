import { Perks as Runes } from "@/models/LiveGame";
import { getPerkSrc } from "@/services/imageGetter";
type Props = { perks: Runes };
export function Perks({ perks }: Props) {
  const mainPerk = perks.perkIds[0];
  const perkStyle = perks.perkIds.slice(1, 4);
  const perkSubstyle = perks.perkIds.slice(4, 6);
  const perkStatModes = perks.perkIds.slice(6, 9);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row items-bottom gap-2">
        <div className="w-8 bg-black rounded-full">
          <img className="" alt="" src={getPerkSrc(mainPerk)} />
        </div>

        {perkStyle.map((id) => (
          <img
            className="w-8 object-contain"
            alt=""
            key={id}
            src={getPerkSrc(id)}
          />
        ))}
      </div>

      <div className="flex flex-row items-center gap-2">
        {perkSubstyle.map((id) => (
          <img
            alt=""
            className="w-8 object-contain"
            key={id}
            src={getPerkSrc(id)}
          />
        ))}
        <div className="flex flex-row gap-1">
          {perkStatModes.map((id, index) => (
            <div
              key={`${id}_${index}`}
              className="w-5 h-5 rounded-full bg-gray-900"
            >
              <img alt="" src={getPerkSrc(id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

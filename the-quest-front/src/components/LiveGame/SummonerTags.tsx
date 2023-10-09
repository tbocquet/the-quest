import { PoroTag } from "@/models/porofessor";
import style from "./styles/SummonerTags.module.scss";

type Props = {
  tags: PoroTag[];
};
export function SummonerTags({ tags }: Props) {
  return (
    <div className={style.summonerTags}>
      {tags.map((tag, index) => {
        let tagClass = "";
        switch (tag.value.toString()) {
          case "good":
            tagClass = style.good;
            break;
          case "bad":
            tagClass = style.bad;
            break;
          default:
            tagClass = style.neutral;
            break;
        }
        return (
          <div key={index} className={style.tag + " " + tagClass}>
            <h4>{tag.title}</h4>
          </div>
        );
      })}
    </div>
  );
}

import { PoroTag } from "@/models/Porofessor";

type Props = {
  tags: PoroTag[];
};
export function SummonerTags({ tags }: Props) {
  return (
    <div className="flex flex-row flex-wrap min-h-[3rem] py-1 gap-1 items-start justify-center">
      {tags.map((tag, index) => {
        let color = "";
        switch (tag.value.toString()) {
          case "good":
            color = "bg-green-800";
            break;
          case "bad":
            color = "bg-red-800";
            break;
          default:
            color = "bg-yellow-800";
            break;
        }
        return (
          <div
            key={index}
            className={"rounded px-1 py-[2px] text-[0.7rem] " + color}
          >
            {tag.title}
          </div>
        );
      })}
    </div>
  );
}

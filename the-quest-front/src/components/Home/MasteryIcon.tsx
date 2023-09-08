import { getMasteryIcon } from "@/services/imageGetter";

type Props = {
  lvl: number;
  size: number;
  xposition: number;
  yposition: number;
  zposition: number;
};

export function MasteryIcon({
  lvl,
  size,
  xposition,
  yposition,
  zposition,
}: Props) {
  const myStyle = {
    left: xposition,
    top: yposition,
    zposition: zposition,
  };

  return (
    <img
      className="background-mastery-icon"
      style={myStyle}
      src={getMasteryIcon(lvl)}
      alt=""
      height={size}
    />
  );
}

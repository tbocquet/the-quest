import "./Styles/LaneCheckBox.scss";
import { getLaneIcon } from "@/services/imageGetter";

type Props = {
  lane: string;
  isSelected: boolean;
  onCheckboxChange: any;
};

export const LaneCheckBox = ({ lane, isSelected, onCheckboxChange }: Props) => (
  <div
    className={isSelected ? "lane-checkBox selected" : "lane-checkBox"}
    onClick={onCheckboxChange}
  >
    <img alt="" src={getLaneIcon(lane)} className="laneIcon"></img>
    <span className="tooltip">{lane}</span>
  </div>
);

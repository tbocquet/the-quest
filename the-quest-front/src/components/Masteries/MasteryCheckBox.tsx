import "./Styles/MasteryCheckBox.scss";
import { getMasteryIcon } from "@/imageGetter";

type Props = {
  lvl: number;
  isSelected: boolean;
  onCheckboxChange: any;
};

export const MasteryCheckBox = ({
  lvl,
  isSelected,
  onCheckboxChange,
}: Props) => (
  <div
    className={isSelected ? "mastery-checkBox selected" : "mastery-checkBox"}
    onClick={onCheckboxChange}
  >
    <img alt="" src={getMasteryIcon(lvl)} className="masteryIcon"></img>
  </div>
);

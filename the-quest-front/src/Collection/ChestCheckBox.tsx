import { chestSrc } from "../imagesSrc";
import "./Styles/ChestCheckBox.scss";

type Props = {
  isSelected: boolean;
  onCheckboxChange: any;
};
export function ChestCheckBox({ isSelected, onCheckboxChange }: Props) {
  return (
    <div
      className={isSelected ? "chest-checkBox selected" : "chest-checkBox"}
      onClick={onCheckboxChange}
    >
      <img alt="" src={chestSrc()} className="chestIcon"></img>
    </div>
  );
}

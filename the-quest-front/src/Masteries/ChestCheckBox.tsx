import { getChestIcon } from "../imageGetter";
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
      <img alt="" src={getChestIcon()} className="chestIcon"></img>
    </div>
  );
}

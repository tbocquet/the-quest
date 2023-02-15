import "./Styles/RegionCheckBox.scss";
import { getRegionIcon } from "../imageGetter";

type Props = {
  region: string;
  isSelected: boolean;
  onCheckboxChange: any;
};

export const RegionCheckBox = ({
  region,
  isSelected,
  onCheckboxChange,
}: Props) => (
  <div
    className={isSelected ? "region-checkBox selected" : "region-checkBox"}
    onClick={onCheckboxChange}
  >
    <img alt="" src={getRegionIcon(region)} className="regionIcon"></img>
    <span className="tooltip">{region}</span>
  </div>
);

import "./Styles/RoleCheckBox.scss";
import { getRoleSrc } from "../imagesSrc";

type Props = {
  role: string;
  isSelected: boolean;
  onCheckboxChange: any;
};

export const RoleCheckBox = ({ role, isSelected, onCheckboxChange }: Props) => (
  <div
    className={isSelected ? "role-checkBox selected" : "role-checkBox"}
    onClick={onCheckboxChange}
  >
    <img alt="" src={getRoleSrc(role)} className="roleIcon"></img>
    <span className="tooltip">{role}</span>
  </div>
);

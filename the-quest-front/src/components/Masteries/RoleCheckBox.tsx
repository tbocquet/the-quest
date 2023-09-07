import "./Styles/RoleCheckBox.scss";
import { getRoleIcon } from "@/imageGetter";

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
    <img alt="" src={getRoleIcon(role)} className="roleIcon"></img>
    <span className="tooltip">{role}</span>
  </div>
);

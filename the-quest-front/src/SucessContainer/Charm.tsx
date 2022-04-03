import "./Styles/Charm.scss";
import { Charm } from "./charmsData";

type Props = {
  charm: Charm;
  visible: boolean;
};
export function CharmComponent({ charm, visible }: Props) {
  //const path = `../Assets/${charm.charmIcon}`;
  //const path = "../Assets/1champ7.png";
  return <img alt="" className="charm-icon" src={charm.icon} />;
}

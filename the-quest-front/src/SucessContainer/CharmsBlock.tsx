import { CharmComponent } from "./Charm";
import { AllCharms } from "./charmsData";
import "./Styles/CharmsBlock.scss";

export function CharmsBlock() {
  return (
    <div className="charmsBlock">
      {AllCharms.map((charm, index) => (
        <CharmComponent charm={charm} visible={true} key={index} />
      ))}
    </div>
  );
}

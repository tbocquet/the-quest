import { useEffect, useState } from "react";
import { Mastery } from "../type";
import * as calc from "./sucessCalculs";

import { useSumList } from "../SumListContext";
import { getMasterySrc } from "../imagesSrc";
import "./Styles/SucessContainer.scss";
import { getSummonerInfo, getSummonerProfileIcon } from "../API_call";

type SumData = {
  name: string;
  profileIconId: number;
  summonerLevel: number;
};

type Props = { summoner: string; masteries: Mastery[] };

export function SucessContainer({ summoner, masteries }: Props) {
  const [sumData, setSumData] = useState<SumData | null>(null);
  const [error, setError] = useState<boolean>(false);

  const { setSumList } = useSumList();

  useEffect(() => {
    getSummonerInfo(summoner)
      .then((res) => {
        // @ts-ignore
        setSumData(res);
        setSumList(res);
        setError(false);
      })
      .catch(() => setError(true));
  }, [summoner]);

  if (error) return <div>Summoner not found</div>;
  if (!sumData) return <div>Loading...</div>;

  return (
    <div className="lq-sucessContainer">
      <div className="summoner-block">
        <img
          src={getSummonerProfileIcon(sumData.profileIconId)}
          alt=""
          className="summoner-icon"
        />
        <div className="summoner-name">{sumData.name}</div>
      </div>

      <div className="questProgression-block">
        <img
          src={require("./Assets/150champ7.png")}
          alt=""
          className="main-achievement-image"
        />
      </div>

      <div className="stats-block">
        <div className="questProgression">
          Avancée du voyage : {calc.getQuestProgression(masteries)}%
        </div>
        <div className="nb-total-champion">
          Nombre total de champions : {calc.countChampions(masteries)}
        </div>
        <div className="list-mastery-amount">
          <div className="mastery-amount-block">
            <img src={getMasterySrc(7)} alt="" className="mastery-icon" />
            <div className="mastery-amount">
              {calc.countMastery7(masteries)}
            </div>
          </div>

          <div className="mastery-amount-block">
            <img src={getMasterySrc(6)} alt="" className="mastery-icon" />
            <div className="mastery-amount">
              {calc.countMastery6(masteries)}
            </div>
          </div>

          <div className="mastery-amount-block">
            <img src={getMasterySrc(5)} alt="" className="mastery-icon" />
            <div className="mastery-amount">
              {calc.countMastery5(masteries)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

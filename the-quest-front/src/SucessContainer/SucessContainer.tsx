import React from "react";
import { Mastery } from "../type";
import * as calc from "./sucessCalculs";

import { getMasterySrc } from "../imagesSrc";
import { SummonerInfoBlock } from "./SummonerInfoBlock";
import "./Styles/SucessContainer.scss";

type Props = { summoner: string; masteries: Mastery[] };

export function SucessContainer({ summoner, masteries }: Props) {
  return (
    <div className="lq-sucessContainer">
      <SummonerInfoBlock summonerName={summoner} />

      <div className="questProgression-block">
        <img
          src={require("./Assets/150champ7.png")}
          alt=""
          className="main-achievement-image"
        />
      </div>

      <div className="stats-block">
        <React.Fragment>
          <div className="questProgression">
            Avancée du voyage : {calc.getQuestProgression(masteries)}%
          </div>

          <div className="nb-total-champion">
            Nombre total de champions : {calc.countChampions(masteries)}
          </div>
        </React.Fragment>

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

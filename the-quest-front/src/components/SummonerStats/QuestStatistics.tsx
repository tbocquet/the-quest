/*View contenant les statistiques liées à l'avancé de la quête*/

import React from "react";
import * as calc from "./StatisticsFunctions";
import { getMasteryIcon } from "@/imageGetter";
import { ChampionMastery } from "@/type";
import "./Styles/QuestStatistics.scss";

type Props = { masteries: ChampionMastery[] };

export function QuestStatistics({ masteries }: Props) {
  return (
    <div className="stats-block">
      <div className="list-mastery-amount">
        <div className="mastery6-amount-block ">
          <img src={getMasteryIcon(6)} alt="" className="mastery-icon" />
          <div className="mastery-amount">{calc.countMastery6(masteries)}</div>
        </div>

        <div className="mastery7-amount-block">
          <img src={getMasteryIcon(7)} alt="" className="mastery-icon" />
          <div className="mastery-amount">{calc.countMastery7(masteries)}</div>
        </div>

        <div className="mastery5-amount-block">
          <img src={getMasteryIcon(5)} alt="" className="mastery-icon" />
          <div className="mastery-amount">{calc.countMastery5(masteries)}</div>
        </div>
      </div>

      <React.Fragment>
        <div className="questProgression">
          Avancée du voyage : {calc.getQuestProgression(masteries)}%
        </div>

        <div className="nb-total-champion">
          Nombre total de champions : {calc.countChampions(masteries)}
        </div>
      </React.Fragment>
    </div>
  );
}

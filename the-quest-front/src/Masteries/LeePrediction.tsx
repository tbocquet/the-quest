import { useState } from "react";
import { ChampionMastery } from "../type";
import "./Styles/LeePrediction.scss";

type Props = {
  masteries: ChampionMastery[];
};

export function LeePrediction({ masteries }: Props) {
  const [prediction, setPrediction] = useState<ChampionMastery | null>(null);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  function getPrediction(): ChampionMastery {
    return masteries[getRandomInt(masteries.length)];
  }
  return (
    <>
      <div
        className="lee-sin-choice"
        onClick={() => masteries.length > 0 && setPrediction(getPrediction())}
      >
        <img alt="" src="/lee-prediction2.png"></img>
      </div>
      {prediction !== null && (
        <div className="lee-sin-prediction">
          <img alt="" src={"/centered/" + prediction.id + "_0.jpg"} />
          <h3 className="okButton" onClick={() => setPrediction(null)}>
            OK, je vais jouer ça !
          </h3>
        </div>
      )}
    </>
  );
}

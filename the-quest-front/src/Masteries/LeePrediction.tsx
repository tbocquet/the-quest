import { useEffect, useState } from "react";
import { getChampionCentered } from "../imageGetter";
import { ChampionMastery } from "../type";
import "./Styles/LeePrediction.scss";

type Props = {
  masteries: ChampionMastery[];
};

export function LeePrediction({ masteries }: Props) {
  const [prediction, setPrediction] = useState<ChampionMastery | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

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
        <img alt="" src="/image/lee-prediction.png"></img>
      </div>
      {prediction !== null && (
        <div className="lee-sin-prediction">
          <img
            alt=""
            src={getChampionCentered(prediction.id)}
            onLoad={() => setImgLoaded(true)}
          />
          {imgLoaded && (
            <h3
              className="okButton"
              onClick={() => {
                setPrediction(null);
                setImgLoaded(false);
              }}
            >
              OK, je vais jouer ça !
            </h3>
          )}
        </div>
      )}
    </>
  );
}

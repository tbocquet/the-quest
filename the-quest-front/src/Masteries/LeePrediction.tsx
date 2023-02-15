import { useEffect, useState, useRef } from "react";
import {
  getChampionCentered,
  getLaneIcon,
  getRegionIcon,
  getRoleIcon,
} from "../imageGetter";
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

  /**
   * Hook that alerts clicks outside of the passed ref
   * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
   */
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setPrediction(null);
          setImgLoaded(false);
          //alert("You clicked outside of me!");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      <div
        className="lee-sin-choice"
        onClick={() => masteries.length > 0 && setPrediction(getPrediction())}
      >
        <img alt="" src="/image/lee-prediction.png"></img>
      </div>
      {prediction !== null && (
        <div className="lee-sin-prediction" ref={wrapperRef}>
          <img
            alt=""
            src={getChampionCentered(prediction.id)}
            onLoad={() => setImgLoaded(true)}
          />

          <div className="champion-info-block">
            <h3 className="champion-name">{prediction.name}</h3>
            {/* Regions */}

            {prediction.region !== "" && (
              <div className="line-info-block">
                <img alt="Region icon" src={getRegionIcon(prediction.region)} />
                <p>{prediction.region}</p>
              </div>
            )}

            {/* Rôles */}
            <div className="line-info-block">
              {prediction.tags.map((tag) => (
                <img
                  alt="Rôle icon"
                  key={tag + "_icon_index"}
                  src={getRoleIcon(tag)}
                />
              ))}
              {prediction.tags.map((tag, index) => (
                <p key={tag + "_index"}>
                  {tag}
                  {index < prediction.tags.length - 1 && <>&nbsp;/&nbsp;</>}
                </p>
              ))}
            </div>

            {/* Lanes */}
            <div className="line-info-block">
              {prediction.lane.map((lane) => (
                <img
                  alt="Lane icon"
                  key={lane + "_icon_index"}
                  src={getLaneIcon(lane)}
                />
              ))}
              {prediction.lane.map((lane, index) => (
                <p key={lane + "_index"}>
                  {lane}
                  {index < prediction.lane.length - 1 && <>&nbsp;/&nbsp;</>}
                </p>
              ))}
            </div>
          </div>

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

import { useEffect, useState, useRef } from "react";
import { useMasteriesFilters } from "../../context/MasteriesFilterContext";
import { useSummonerMasteries } from "../../context/SummonerMasteries";
import {
  getChampionCentered,
  getLaneIcon,
  getRegionIcon,
  getRoleIcon,
  leePredictionImage,
} from "@/imageGetter";
import { ChampionMastery } from "@/type";
import "./Styles/LeePrediction.scss";
import { useRouteLoaderData } from "react-router-dom";

export function LeePrediction() {
  //Récupération des données du loader
  const data = useRouteLoaderData("summoner") as any;
  const summonerMasteries = data.summonerMasteries as ChampionMastery[];

  const filters = useMasteriesFilters();
  const [prediction, setPrediction] = useState<ChampionMastery | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function getPrediction(): ChampionMastery | null {
    let MList = getSelectedChampionList(summonerMasteries);
    return MList.length > 0 ? MList[getRandomInt(MList.length)] : null;
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

  function getSelectedChampionList(
    Mlist: ChampionMastery[]
  ): ChampionMastery[] {
    return Mlist.reduce(
      (acc: ChampionMastery[], champMast: ChampionMastery) => {
        /*Le filtre est il actif ?*/
        const Lfilter = filters.laneFilter.length !== 0;
        const Mfilter = filters.masteriesLevelFilter.length !== 0;
        const Rfilter = filters.roleFilter.length !== 0;
        const Cfilter = filters.championFilter !== "";
        const REfilter = filters.regionFilter.length !== 0;

        /*L'élément correspond t'il aux filtres ?*/
        const LOK = champMast.lane.some((lane) =>
          filters.laneFilter.includes(lane)
        ); //L'element contient t'il au moins une des lanes selectionnées
        const ROk = filters.roleFilter.every((item) =>
          champMast.tags.includes(item)
        );
        const MOk = filters.masteriesLevelFilter.includes(champMast.level);
        const REOK = filters.regionFilter.some((region) =>
          champMast.region.includes(region)
        );
        const champName = champMast.name.toLocaleLowerCase();

        //L'élément correspond t'il à tous les filtres actif ?
        if (
          (!Cfilter ||
            (Cfilter && champName.includes(filters.championFilter))) && //Ok with championSearchFilter
          (!filters.chestFilter ||
            (filters.chestFilter && !champMast.chestGranted)) && //Ok with chestFilter
          (!Lfilter || (Lfilter && LOK)) && //Ok with laneFilter
          (!Mfilter || (Mfilter && MOk)) && //Ok with masteryFilter
          (!Rfilter || (Rfilter && ROk)) && //ok with roleFilter
          (!REfilter || (REfilter && REOK))
        ) {
          return [...acc, champMast];
        } else {
          return acc;
        }
      },
      []
    );
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <>
      <div
        className="lee-sin-choice"
        onClick={() => setPrediction(getPrediction())}
      >
        <img alt="" src={leePredictionImage()}></img>
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
            <div className="line-info-block">
              {prediction.region.map((tag) => (
                <img
                  alt="Region icon"
                  key={tag + "_icon_index"}
                  src={getRegionIcon(tag)}
                />
              ))}
              {prediction.region.map((tag, index) => (
                <p key={tag + "_index"}>
                  {tag}
                  {index < prediction.region.length - 1 && <>&nbsp;/&nbsp;</>}
                </p>
              ))}
            </div>

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

import { useState, useRef, useEffect } from "react";
import { getSuccessIcon, getSuccessNotOwnedIcon } from "../imageGetter";
import { ChampionList } from "./ChampionList";
import ReactAudioPlayer from "react-audio-player";
import "./Styles/SuccesElement.scss";

type Props = {
  title: string;
  url: string;
  description: string;
  champions: string[] | null;
  clause: string | null;
  owned: boolean;
  music: undefined | string;
};

export function SuccessElement({
  title,
  url,
  description,
  clause,
  champions,
  owned,
  music,
}: Props) {
  const [visible, setVisible] = useState(false);
  //const [myClassName,setMyClassName] = useState();

  const boxRef = useRef<HTMLDivElement>(null);
  // X
  const [x, setX] = useState<number | undefined>();
  // Y
  const [y, setY] = useState<number | undefined>();

  // This function calculate X and Y
  const getPosition = () => {
    const x = boxRef.current?.offsetLeft;
    setX(x);

    const y = boxRef.current?.offsetTop;
    setY(y);
  };

  // Get the position of the red box in the beginning
  useEffect(() => {
    getPosition();
  }, []);

  // Re-calculate X and Y of the red box when the window gets resized by the user
  useEffect(() => {
    window.addEventListener("resize", getPosition);
  }, []);

  return (
    <div className="successElement" ref={boxRef}>
      <div className="iconContainer">
        <img
          src={owned ? getSuccessIcon(url) : getSuccessNotOwnedIcon()}
          alt=""
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
          className={visible ? "successIcon bigger" : "successIcon"}
        />
        {/* Pour les succes ayant une musiques */}
        <div className="music-block">
          {music && owned && visible && (
            <ReactAudioPlayer src={music} autoPlay controls volume={0.5} />
          )}
        </div>
      </div>

      <div
        className={
          x !== undefined && x > window.innerWidth / 2
            ? "infoBlockHidderRight"
            : "infoBlockHidderLeft"
        }
      >
        <div
          className={
            visible
              ? "infoBlockContainer isVisible"
              : "infoBlockContainer isHidden"
          }
        >
          <div className="successInfoBlock">
            <h4>{owned ? title : "???"}</h4>
            <p className="description">{owned ? description : "???"}</p>
            {clause != null && <p className="clause">{clause}</p>}
            {champions != null && <ChampionList champions={champions} />}
          </div>
        </div>
      </div>
    </div>
  );
}

import { secondsElapsedSince, formatTime2 } from "@/utils/date";
import { useEffect, useState } from "react";
import style from "./styles/LiveGame.module.scss";

type Props = {
  startTime: number;
};
export function GameTimer({ startTime }: Props) {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const secondeSinceGameStart = secondsElapsedSince(startTime);
    setTimer(secondeSinceGameStart);
    const intervalId = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, timer]);

  return <span className={style.gameTimer}>{formatTime2(timer)}</span>;
}

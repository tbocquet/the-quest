// Renvoit l'arrière plan animé des masteries bougeant tel des étoiles dans le ciel

import { MasteryIcon } from "./MasteryIcon";
import "./Styles/Background.scss";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

//Renvoit un container contenant les masteries ordonnées de façon aléatoire
function BackgroundLayer(
  zindex: number,
  elementSize: number,
  eltAmount: number
) {
  const arr = Array.from({ length: eltAmount });
  return (
    <div className={"background-layer layer-" + zindex}>
      {arr.map((val, i) => (
        <>
          <MasteryIcon
            key={i}
            lvl={getRandomInt(8)}
            size={elementSize}
            xposition={getRandomInt(window.innerWidth)}
            yposition={getRandomInt(window.innerHeight)}
            zposition={zindex}
          />
          {/* Donner l'illusion que les masteries tombent en continu */}
          <MasteryIcon
            key={i + "_copy_for_animation"}
            lvl={getRandomInt(8)}
            size={elementSize}
            xposition={getRandomInt(window.innerWidth)}
            yposition={getRandomInt(window.innerHeight) - window.innerHeight}
            zposition={zindex}
          />
        </>
      ))}
    </div>
  );
}

export function Background() {
  return (
    <div className="home-background-container">
      {BackgroundLayer(4, 50, 25)}
      {BackgroundLayer(3, 30, 75)}
      {BackgroundLayer(2, 20, 150)}
      {BackgroundLayer(1, 10, 300)}
    </div>
  );
}

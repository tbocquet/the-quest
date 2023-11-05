import { Skin } from "@/models/ChampionDetails";
import { getFullChampionSkinSpashesById } from "@/services/imageGetter";
import { useRef, useState } from "react";
import "./styles/carousel.scss";

type Props = { championKey: string; skins: Skin[] };
export function Carousel({ championKey, skins }: Props) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const componentRef = useRef(null);

  const handleOnClick = (event: any) => {
    const rect = event.target.getBoundingClientRect(); // Récupère les dimensions du composant
    const x = event.clientX - rect.left; // Coordonnée X du clic par rapport au composant

    const width = rect.right - rect.left;

    if (x < width / 2) {
      if (currentImgIndex === 0) setCurrentImgIndex(skins.length - 1);
      else setCurrentImgIndex((currentImgIndex - 1) % skins.length);
    } else {
      setCurrentImgIndex((currentImgIndex + 1) % skins.length);
    }
  };

  return (
    <div className="carousel-component">
      <img
        ref={componentRef}
        src={getFullChampionSkinSpashesById(
          championKey,
          skins[currentImgIndex].id
        )}
        onClick={(e) => handleOnClick(e)}
      />
      <h3>{skins[currentImgIndex].name}</h3>

      <ul className="skin-list">
        {skins.map((skin, index) => (
          <li key={index}>
            <img
              alt={skin.name}
              className={`carousel-tile ${
                index === currentImgIndex && "selected"
              }`}
              onClick={() => setCurrentImgIndex(index)}
              src={getFullChampionSkinSpashesById(championKey, skin.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

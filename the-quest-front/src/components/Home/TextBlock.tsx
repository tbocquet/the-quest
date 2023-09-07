import { textData } from "./data";
import { useState } from "react";
import "./Styles/TextBlock.scss";
export function TextBlock() {
  const [indexTextData, setIndexTextData] = useState(0);

  return (
    <div className="text-block-content">
      {textData[indexTextData]}
      <ul className="text-block-nav">
        {textData.map((_, i) => (
          <li
            key={i}
            className={
              i === indexTextData
                ? "nav-element home-selected-nav-elt"
                : "nav-element"
            }
            onClick={() => setIndexTextData(i)}
            //onMouseOver={() => setIndexTextData(i)}
          ></li>
        ))}
      </ul>
    </div>
  );
}

import { Champion } from "@/models/type";
import championData from "@/assets/champion.json";
import { ChampionUi } from "./ChampionUi";
import "./AllChampionPage.scss";
import { useState } from "react";
import shuffle from "lodash.shuffle";

export function AllChampionsPage() {
  const allChampions: Champion[] = championData;
  const [champions, setChampions] = useState(allChampions);

  return (
    <div id="all-champions">
      {/* <ul>
        {championData.map((championData) => (
          <li key={championData.id}>
            <ChampionUi championData={championData} />
          </li>
        ))}

      </ul> */}
      {/* <button onClick={() => setChampions(shuffle)}>Shuffle</button> */}
      {/* <ReorderingList champions={champions} /> */}
    </div>
  );
}

import { ChampionDetails as CD } from "@/models/ChampionDetails";
import { getChampionDetails } from "@/services/championDetails";
import { getFullChampionSpashesById } from "@/services/imageGetter";
import { useEffect, useState } from "react";
import "./styles/champion-details.scss";
import { ChampionStatsUi } from "./ChampionStatsUi";
import { Carousel } from "./ComponentCarousel";
import Skill from "./Skill";
import Passive from "./Passive";

export default function ChampionDetails() {
  const [data, setData] = useState<null | CD>(null);

  useEffect(() => {
    getChampionDetails("Senna").then((res) => setData(res));
  }, []);

  if (data === null) {
    return <p color="white">loading...</p>;
  }

  const C = data as CD;

  return (
    <div className="champion-details">
      <img alt="backgound" src={getFullChampionSpashesById(C.key)}></img>

      <h1>{C.name}</h1>
      <h2>{C.title}</h2>
      <ChampionStatsUi level={18 - 1} stats={C.stats} />
      <p>{C.lore}</p>
      <ul>
        {<li>{<Passive spell={C.passive} />}</li>}
        {C.spells.map((spell) => (
          <Skill key={spell.id} spell={spell} />
        ))}
      </ul>

      <Carousel championKey={C.key} skins={C.skins} />
    </div>
  );
}

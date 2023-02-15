//Container des succès*/

import { SuccessElement } from "./SuccessElement";
import { useEffect, useState } from "react";
import {
  getGeneralSuccess,
  getRigoloSuccess,
  getRoleSuccess,
} from "./SuccessFunctions";
import { Success } from "./type";
import { useSummonerMasteries } from "../Context/SummonerMasteries";
import "./Styles/Success.scss";

export function SuccessBlock() {
  const [general, setGeneral] = useState<Success[]>([]);
  const [role, setRole] = useState<Success[]>([]);
  const [rigolo, setRigolo] = useState<Success[]>([]);

  const [all, setAll] = useState<Success[]>([]);

  const { sumMasteryList } = useSummonerMasteries();

  useEffect(() => {
    const general = getGeneralSuccess(sumMasteryList);
    const role = getRoleSuccess(sumMasteryList);
    const rigolo = getRigoloSuccess(sumMasteryList);

    setGeneral(general);
    setRigolo(rigolo);
    setRole(role);

    setAll([...general, ...role, ...rigolo]);
  }, [sumMasteryList]);

  //Un champion est possédé si tous les champions de la liste sont possédé ou is le nombre de champion mastery 7 dépasse le nombre requis pour le succès
  return (
    <>
      <ul className="successList">
        {all.map((elt, index) => (
          <li key={index}>
            <SuccessElement
              title={elt.title}
              url={elt.url}
              description={elt.description}
              clause={elt.clause}
              champions={elt.championsList}
              owned={elt.owned}
              music={elt.music}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

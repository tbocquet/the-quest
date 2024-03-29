/* Affiche l'icone d'invocateur si connue coté front-end sinon affiche l'icon par default */
/* Css du parent*/

import {
  getCDragonSummonerIcon,
  getSummonerDefaultProfileIcon,
} from "@/services/imageGetter";
import { useState } from "react";

type Props = {
  iconId: number;
};
export function SumListElementIcon({ iconId }: Props) {
  const [imgError, setImgError] = useState(false);
  return !imgError ? (
    <img
      src={getCDragonSummonerIcon(iconId)}
      onError={() => setImgError(true)}
      alt=""
      className="sumIcon"
    />
  ) : (
    <img src={getSummonerDefaultProfileIcon()} alt="" className="sumIcon" />
  );
}

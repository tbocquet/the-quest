import { Stats } from "@/models/ChampionDetails";
import "./styles/champion-stats.scss";

type Props = {
  level: number;
  stats: Stats;
};
export function ChampionStatsUi({ stats, level }: Props) {
  return (
    <ul className="champion-detail-stats">
      <li>
        <img alt="hp" className="stat-icon" src="images/icons/stats/hp.png" />
        <span>{stats.hp + stats.hpperlevel * level}</span>
        <span>( + {stats.hpperlevel} par niveau)</span>
        <span>( Regen : {stats.hpregen} )</span>
        <span>
          ( + {(stats.hpregen + stats.hpregenperlevel * level).toFixed(2)} par
          niveau)
        </span>
      </li>
      <li>
        <img
          alt="mana"
          className="stat-icon"
          src="images/icons/stats/mana.png"
        />
        <span>{stats.mp + stats.mpperlevel * level}</span>
        <span>( + {stats.mpperlevel} par niveau)</span>
        <span>( Regen : {stats.mpregen} )</span>
        <span>
          ( +{" "}
          {(stats.mpregenperlevel + stats.mpregenperlevel * level).toFixed(2)}{" "}
          par niveau)
        </span>
      </li>
      <li>
        <img
          alt="armor"
          className="stat-icon"
          src="images/icons/stats/armor.png"
        />
        <span>{stats.armor + stats.armorperlevel * level}</span>
        <span>( + {stats.armorperlevel} par niveau)</span>
      </li>
      <li>
        <img
          alt="magicResist"
          className="stat-icon"
          src="images/icons/stats/magicResist.png"
        />
        <span>{stats.spellblock + stats.spellblockperlevel * level}</span>
        <span>( + {stats.spellblockperlevel} par niveau)</span>
      </li>

      <li>
        <img
          alt="attack"
          className="stat-icon"
          src="images/icons/stats/adaptativeForce.png"
        />
        <span>{stats.attackdamage + stats.attackdamageperlevel * level}</span>
        <span>( + {stats.attackdamageperlevel} par niveau)</span>
      </li>
      <li>
        <img
          alt="attackSpeed"
          className="stat-icon"
          src="images/icons/stats/attackSpeed.png"
        />
        <span>
          {(
            (stats.attackspeed +
              stats.attackspeedperlevel * level * stats.attackspeed) /
            100
          ).toFixed(2)}
        </span>
        <span>( + {stats.attackspeedperlevel}% par niveau)</span>
      </li>
    </ul>
  );
}

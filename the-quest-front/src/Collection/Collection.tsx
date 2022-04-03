import { Mastery, Champion } from "../type";
import { CollectionElement } from "./CollectionElement";
import "./Styles/Collection.scss";
import React, { useState } from "react";
import { MasteryCheckBox } from "./MasteryCheckBox";
import { SearchBar } from "./SearchBar";
import { RoleCheckBox } from "./RoleCheckBox";
import { ChestCheckBox } from "./ChestCheckBox";

type Props = {
  masteries: Mastery[];
  champions: Champion[];
};

export function Collection({ champions, masteries }: Props) {
  const [RoleFilter, setRoleFilter] = useState<string[]>([]);
  const [MasteryFilter, setMasteryFilter] = useState<number[]>([]);
  const [championFilter, setChampionFilter] = useState<string>("");
  const [chestFilter, setChestFilter] = useState<boolean>(false);

  const allMastery = [7, 6, 5, 4, 3, 2, 1];
  const allRole = [
    "Assassin",
    "Colossus",
    "Enchanteur",
    "Fighter",
    "Mage",
    "Marksman",
    "Ninja",
    "Support",
    "Tank",
  ];

  return (
    <React.Fragment>
      <div className="lq-filter">
        <SearchBar
          search={championFilter}
          setSearch={setChampionFilter}
          suggestions={champions.reduce(
            (prev: string[], champ) => [...prev, champ.name],
            []
          )}
        />
        <ul className="mastery-filter-list">
          {allMastery.map((m) => (
            <li key={m}>
              <MasteryCheckBox
                lvl={m}
                isSelected={MasteryFilter.includes(m)}
                onCheckboxChange={() => {
                  MasteryFilter.includes(m)
                    ? setMasteryFilter(MasteryFilter.filter((t) => t !== m))
                    : setMasteryFilter([...MasteryFilter, m]);
                }}
              />
            </li>
          ))}
        </ul>
        <ul className="role-filter-list">
          {allRole.map((tag) => (
            <li key={tag}>
              <RoleCheckBox
                role={tag}
                isSelected={RoleFilter.includes(tag)}
                onCheckboxChange={() => {
                  RoleFilter.includes(tag)
                    ? setRoleFilter(RoleFilter.filter((t) => t !== tag))
                    : setRoleFilter([...RoleFilter, tag]);
                }}
              />
            </li>
          ))}
        </ul>
        <ChestCheckBox
          isSelected={chestFilter}
          onCheckboxChange={() =>
            chestFilter ? setChestFilter(false) : setChestFilter(true)
          }
        />
      </div>
      <div className="lq-collection">
        {masteries.map((mastery, index) => {
          const champ: Champion | undefined = champions.find(
            (champ) => parseInt(champ.key) === mastery.championId
          );
          if (champ === undefined) {
            return <div>Erreur : champion inconnu</div>;
          } else {
            const Mfilter = MasteryFilter.length === 0;
            const Rfilter = RoleFilter.length === 0;
            const Cfilter = championFilter === "";
            const ROk = RoleFilter.every((item) => champ.tags.includes(item));
            const MOk = MasteryFilter.includes(mastery.championLevel);
            const champName = champ.name.toLocaleLowerCase();

            if (
              (!chestFilter || (chestFilter && !mastery.chestGranted)) &&
              ((Rfilter && Mfilter) ||
                (Rfilter && MOk) ||
                (Mfilter && ROk) ||
                (ROk && MOk)) &&
              (Cfilter || champName.includes(championFilter))
            ) {
              return (
                <CollectionElement
                  key={index}
                  mastery={mastery}
                  champion={champ}
                />
              );
            } else {
              return null;
            }
          }
        })}
      </div>
    </React.Fragment>
  );
}

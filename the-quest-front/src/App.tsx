import "./App.css";
import React from "react";
import { Header } from "./Header/Header";
import { SucessContainer } from "./SucessContainer/SucessContainer";
import { Collection } from "./Collection/Collection";
import { useSummoner } from "./SummonerContext";
import { useState } from "react";
import { useEffect } from "react";
import { getAllChampions, getSummonerMasteries } from "./API_call";
import { Mastery, Champion } from "./type";
import { Loader } from "./Loader";
import { SummonerNotFound } from "./SummonerNotFound";

function App() {
  const [allChampions, setAllChampions] = useState<Champion[] | null>(null);
  const [masteries, setMasteries] = useState<Mastery[] | null>(null);
  const { summoner } = useSummoner();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getAllChampions()
      .then((data) => {
        setAllChampions(data);
        setError(false);
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    summoner !== "" &&
      getSummonerMasteries(summoner)
        .then((data) => {
          setMasteries(
            data.sort((a: Mastery, b: Mastery) =>
              a.championPoints > b.championPoints ? -1 : 1
            )
          );
          setError(false);
        })
        .catch(() => setError(true));
  }, [summoner]);

  return (
    <div className="App">
      <Header />
      {summoner !== "" && (
        <React.Fragment>
          {error ? (
            <SummonerNotFound />
          ) : !allChampions || !masteries ? (
            <Loader />
          ) : (
            <React.Fragment>
              <SucessContainer summoner={summoner} masteries={masteries} />
              <Collection masteries={masteries} champions={allChampions} />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default App;

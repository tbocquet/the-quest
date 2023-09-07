import "./Styles/Home.scss";
import { SearchBar } from "../Header/SearchBar";
import { SumList } from "../Header/SumList";
// import { Background } from "./Background";
import { TextBlock } from "./TextBlock";

export function Home() {
  return (
    <>
      {/* <Background /> */}
      <div className="home-content">
        <div className="home-search-block">
          <h4>L'extraordinaire site de </h4>
          {/* Mettre des mots randoms qui changent tous les X (fabuleux, extraordinaire cosmique etc) */}
          <h1>LA QUÊTE</h1>
          <SearchBar />
          <SumList />
        </div>
        <TextBlock />
      </div>
    </>
  );
}

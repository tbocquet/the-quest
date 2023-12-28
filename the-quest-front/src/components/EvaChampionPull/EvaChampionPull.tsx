import ListElt from "./ListElt";
// import "./style.scss";
export default function EvaChampionPull() {
  return (
    <ul className="evaChampionPull">
      <li>
        <ListElt championId="yuumi" toPlayWith={["fizz"]} />
        <ListElt championId="rakan" toPlayWith={["xayah"]} />
        <ListElt championId="sejuani" toPlayWith={["ashe"]} />
        <ListElt championId="rell" toPlayWith={["samira", "nilah"]} />
        <ListElt championId="warwick" toPlayWith={["kindred"]} />
        <ListElt championId="morgana" toPlayWith={["lux"]} />
        <ListElt championId="leona" toPlayWith={[]} />
        <ListElt championId="jarvanIV" toPlayWith={[]} />
        <ListElt championId="shyvana" toPlayWith={[]} />
        <ListElt championId="lissandra" toPlayWith={[]} />
        <ListElt championId="swain" toPlayWith={["missfortune"]} />
        <ListElt championId="zyra" toPlayWith={["missfortune"]} />
      </li>
    </ul>
  );
}

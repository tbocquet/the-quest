export function Loader() {
  return (
    <div className="lq-loader" style={{ margin: "2em" }}>
      <img
        src={require("./Assets/kled.gif")}
        style={{ height: "15em" }}
        alt="loader-animated-gif"
      ></img>
      <div style={{ color: "white", fontSize: "1em", paddingLeft: "2em" }}>
        Chargement en cours
      </div>
    </div>
  );
}

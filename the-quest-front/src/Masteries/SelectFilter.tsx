import "./Styles/SelectFilter.scss";

type Props = {
  values: string[];
  setSelected: any;
};

export function SelectFilter({ values, setSelected }: Props) {
  return (
    <select
      className="my-select-filter"
      onChange={(e) => setSelected(e.target.value)}
    >
      {values.map((value: string) => (
        <option value={value} key={value} className="my-select-option">
          {value}
        </option>
      ))}
    </select>
  );
}

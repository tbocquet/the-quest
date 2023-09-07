import "./Styles/SelectFilter.scss";

type Props = {
  values: string[];
  setSelected: any;
  current: string;
};

export function SelectFilter({ values, setSelected, current }: Props) {
  return (
    <select
      className="my-select-filter"
      value={current}
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

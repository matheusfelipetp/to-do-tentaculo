type Option = {
  id: string;
  option: string;
};

type SelectProps = {
  options: Option[];
};

export const Select = ({ options }: SelectProps) => {
  return (
    <select className="select">
      {options.map((item) => (
        <option key={item.id} value={item.option}>
          {item.option}
        </option>
      ))}
    </select>
  );
};

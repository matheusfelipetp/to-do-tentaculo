import { useTask } from '@/hooks/useTask';
import { Select as SelectAntd } from 'antd';

type Option = {
  id: string;
  option: string;
};

type SelectProps = {
  options: Option[];
  defaultValue: string;
};

export const Select = ({ options, defaultValue }: SelectProps) => {
  const { taskList, setFilteredList } = useTask();

  const handleChange = (value: string) => {
    if (value === 'Todos') {
      setFilteredList(taskList);
    } else {
      const filteredList = taskList.filter((task) => task.category === value);

      setFilteredList(filteredList);
    }
  };

  return (
    <SelectAntd defaultValue={defaultValue} onChange={handleChange}>
      {options.map(({ id, option }) => (
        <SelectAntd.Option key={id} value={option}>
          {option}
        </SelectAntd.Option>
      ))}
    </SelectAntd>
  );
};

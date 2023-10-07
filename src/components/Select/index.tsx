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
    const sortedTasks = taskList.slice().sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);

      if (dateComparison !== 0) {
        return dateComparison;
      }

      const priorityOrder = { Urgente: 0, Prioridade: 1, Normal: 2 };
      const priorityComparison =
        priorityOrder[a.category] - priorityOrder[b.category];

      return priorityComparison;
    });

    if (value === 'Todos') {
      setFilteredList(sortedTasks);
    } else {
      const filteredList = sortedTasks.filter(
        (task) => task.category === value,
      );

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

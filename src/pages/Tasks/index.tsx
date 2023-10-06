import { Button } from '@/components/Button';
import { ButtonCalendar } from '@/components/ButtonCalendar';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { TaskList } from '@/components/TaskList';
import { v4 as uuid } from 'uuid';

const mock = [
  {
    id: uuid(),
    option: 'Todos',
  },
  {
    id: uuid(),
    option: 'Normal',
  },
  {
    id: uuid(),
    option: 'Prioridade',
  },
  {
    id: uuid(),
    option: 'Urgente',
  },
];

export const TasksPage = () => {
  return (
    <main className="task-main">
      <div className="new-task">
        <Input placeholder="Digite o nome da nova tarefa a ser adicionada" />
        <Button text="Adicionar" />
      </div>

      <div className="select-task">
        <Select options={mock} />
        <ButtonCalendar />
      </div>

      <TaskList />
    </main>
  );
};

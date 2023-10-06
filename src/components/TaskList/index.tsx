import { ClipboardText } from '@phosphor-icons/react';
import { v4 as uuid } from 'uuid';
import { TaskCard } from '../TaskCard';

const mock: any[] = [
  {
    id: uuid(),
    title: 'Estudar Next',
    description: 'Descrição da tarefa 1',
    date: '22/05/2023',
    category: 'Normal',
  },
  {
    id: uuid(),
    title: 'Arrumar o quarto',
    description: 'Descrição da tarefa 1',
    date: '22/05/2023',
    category: 'Prioridade',
  },
  {
    id: uuid(),
    title: 'Lavar a louça',
    description: 'Descrição da tarefa 1',
    date: '22/05/2023',
    category: 'Urgente',
  },
];

export const TaskList = () => {
  return (
    <div className="task-list">
      <div className="text-container">
        <p className="task-created">
          Tarefas Criadas <span>0</span>
        </p>

        <p className="task-finished">
          Concluídas <span>0 de 0</span>
        </p>
      </div>

      {mock?.length ? (
        <div className="tasks">
          {mock.map((elem) => (
            <TaskCard task={elem} key={elem.id} />
          ))}
        </div>
      ) : (
        <div className="empty-list">
          <ClipboardText size={60} />
          <h3>Você ainda não tem tarefas cadastradas</h3>
          <p>Adicione e comece a organizar sua rotina</p>
        </div>
      )}
    </div>
  );
};

import { useMedia } from '@/hooks/useMedia';
import { Pencil, Trash } from '@phosphor-icons/react';

type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  isFinished: boolean;
};

type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const mobile = useMedia('(max-width:47.5rem)');

  const verifyPriority = () => {
    if (task.category === 'Prioridade') {
      return 'priority';
    } else if (task.category === 'Urgente') {
      return 'urgent';
    }
  };

  return (
    <div className="task-card">
      <div className="task-container">
        <input type="checkbox" className="custom-checkbox" />

        <div className={`text-task ${task.isFinished && 'finished'}`}>
          <div className="title-container">
            <h3>{task.title}</h3> <span>{task.date}</span>
          </div>
          <p>{task.description}</p>
        </div>
      </div>

      <div className="actions-container">
        <span className={verifyPriority()}>{!mobile && task.category}</span>

        <div className="btn-container">
          <button className="btn-edit">
            <Pencil size={20} />
          </button>

          <button className="btn-delete">
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

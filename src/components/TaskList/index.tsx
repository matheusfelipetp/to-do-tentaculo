import { TaskCard } from '@/components/TaskCard';
import { useTask } from '@/hooks/useTask';
import { ClipboardText } from '@phosphor-icons/react';

/*
Este componente representa a lista de tarefas exibida na interface de usuário. 
*/

export const TaskList = () => {
  const { taskList, filteredList } = useTask();

  const tasksFinished = filteredList.filter((elem) => elem.isFinished);

  return (
    <div className="task-list">
      <div className="text-container">
        <p className="task-created">
          Tarefas Criadas <span>{filteredList.length}</span>
        </p>

        <p className="task-finished">
          Concluídas
          <span>
            {tasksFinished.length} de {filteredList.length}
          </span>
        </p>
      </div>

      {taskList?.length ? (
        <div className="tasks">
          {filteredList?.length ? (
            filteredList.map((elem) => <TaskCard task={elem} key={elem.id} />)
          ) : (
            <div className="empty-list">
              <ClipboardText size={60} />
              <h3>Você ainda não tem tarefas cadastradas nessa prioridade</h3>
              <p>Adicione e comece a organizar sua rotina</p>
            </div>
          )}
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

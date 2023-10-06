import { ClipboardText } from '@phosphor-icons/react';

const mock: any[] = [];

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
        mock.map((elem) => <>{elem.name}</>)
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

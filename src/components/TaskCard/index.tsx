import { Modal } from '@/components/Modal';
import { TaskProps } from '@/contexts/TaskContext';
import { useMedia } from '@/hooks/useMedia';
import { useTask } from '@/hooks/useTask';
import { storageSaveTask } from '@/storage/storageTasks';
import { Pencil, Trash } from '@phosphor-icons/react';
import { Checkbox, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

type TaskCardProps = {
  task: TaskProps;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const [openModal, setOpenModal] = useState(false);

  const { taskList, setTaskList, removeTask } = useTask();

  const mobile = useMedia('(max-width:47.5rem)');

  const dateFormatted = dayjs(task.date).format('DD/MM/YYYY');

  const verifyPriority = () => {
    if (task.category === 'Prioridade') {
      return 'priority';
    } else if (task.category === 'Urgente') {
      return 'urgent';
    }
  };

  const handleTaskStatus = (id: string) => {
    const updateTask = taskList.find((task) => task.id === id);

    if (updateTask) {
      updateTask.isFinished = !updateTask.isFinished;
    }

    setTaskList([...taskList]);
    storageSaveTask([...taskList]);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="task-card">
      <div className="task-container">
        <Checkbox
          checked={task.isFinished}
          onChange={() => handleTaskStatus(task.id)}
        />

        <div className={`text-task ${task.isFinished && 'finished'}`}>
          <div className="title-container">
            <h3>{task.title}</h3> <span>{dateFormatted}</span>
          </div>
          <p>{task.description}</p>
        </div>
      </div>

      <div className="actions-container">
        <span className={verifyPriority()}>{!mobile && task.category}</span>

        <div className="btn-container">
          <button className="btn-edit" onClick={handleOpenModal}>
            <Pencil size={20} />
          </button>

          <Popconfirm
            title="Excluir a tarefa"
            description="Você tem certeza que deseja deletar a tarefa?"
            okText="Sim"
            cancelText="Não"
            onConfirm={() => removeTask(task.id)}
          >
            <button className="btn-delete">
              <Trash size={20} />
            </button>
          </Popconfirm>
        </div>
      </div>

      {openModal && (
        <Modal
          open={openModal}
          handleCancel={handleOpenModal}
          isEditMode
          taskSelected={task}
        />
      )}
    </div>
  );
};

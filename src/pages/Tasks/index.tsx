import { Button } from '@/components/Button';
import { ButtonCalendar } from '@/components/ButtonCalendar';
import { Modal } from '@/components/Modal';
import { Select } from '@/components/Select';
import { TaskList } from '@/components/TaskList';
import { mockOptions } from '@/mocks/options';
import { useState } from 'react';

export const TasksPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <main className="task-main">
      <div className="new-task-container">
        <div className="select-task">
          <Select options={mockOptions} defaultValue="Todos" />
          <ButtonCalendar />
        </div>

        <Button text="Adicionar tarefa" onClick={handleModal} />
      </div>

      <TaskList />

      {openModal && <Modal open={openModal} handleCancel={handleModal} />}
    </main>
  );
};

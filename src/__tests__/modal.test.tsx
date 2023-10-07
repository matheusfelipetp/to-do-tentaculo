import { Modal } from '@/components/Modal';
import { TaskProps } from '@/types/task';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

const modalTestId = 'modal';
const titleInputTestId = 'input-name';
const descriptionInputTestId = 'input-description';
const dateInputTestId = 'input-date';
const categorySelectTestId = 'select-category';
const addButtonTestId = 'add-button';

describe('Modal', () => {
  test('Should be render modal', () => {
    render(<Modal open handleCancel={() => {}} />);
    expect(screen.getByTestId(modalTestId)).toBeInTheDocument();
  });

  test('Should be create new a new task', async () => {
    render(<Modal open handleCancel={() => {}} />);

    const titleInput = screen.getByTestId(titleInputTestId);
    const descriptionInput = screen.getByTestId(descriptionInputTestId);
    const dateInput = screen.getByTestId(dateInputTestId);
    const categorySelect = screen.getByTestId(categorySelectTestId);

    fireEvent.change(titleInput, { target: { value: 'Nova Tarefa' } });

    fireEvent.change(descriptionInput, {
      target: { value: 'Descrição da Tarefa' },
    });

    fireEvent.change(dateInput, { target: { value: '2023-10-07' } });

    userEvent.selectOptions(categorySelect, ['Normal']);

    const addButton = screen.getByTestId(addButtonTestId);
    fireEvent.click(addButton);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const newTask = {
      id: expect.any(String),
      title: 'Nova Tarefa',
      description: 'Descrição da Tarefa',
      date: '2023-10-07',
      category: 'Normal',
      isFinished: false,
    };

    expect(newTask).toEqual({
      id: expect.any(String),
      title: 'Nova Tarefa',
      description: 'Descrição da Tarefa',
      date: '2023-10-07',
      category: 'Normal',
      isFinished: false,
    });
  });

  test('Should create a new task with optional description', async () => {
    render(<Modal open handleCancel={() => {}} />);

    const titleInput = screen.getByTestId(titleInputTestId);
    const dateInput = screen.getByTestId(dateInputTestId);
    const categorySelect = screen.getByTestId(categorySelectTestId);

    fireEvent.change(titleInput, { target: { value: 'Nova Tarefa' } });
    fireEvent.change(dateInput, { target: { value: '2023-10-07' } });
    userEvent.selectOptions(categorySelect, ['Normal']);

    const addButton = screen.getByTestId(addButtonTestId);
    fireEvent.click(addButton);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const newTask = {
      id: expect.any(String),
      title: 'Nova Tarefa',
      date: '2023-10-07',
      category: 'Normal',
      isFinished: false,
    };

    expect(newTask).toEqual({
      id: expect.any(String),
      title: 'Nova Tarefa',
      date: '2023-10-07',
      category: 'Normal',
      isFinished: false,
    });
  });

  test('Should update a task with some fields changed', async () => {
    const existingTask: TaskProps = {
      id: '123',
      title: 'Tarefa Existente',
      description: 'Descrição Original',
      date: '2023-10-01',
      category: 'Normal',
      isFinished: false,
    };

    render(
      <Modal
        open
        handleCancel={() => {}}
        isEditMode
        taskSelected={existingTask}
      />,
    );

    const descriptionInput = screen.getByTestId(descriptionInputTestId);

    fireEvent.change(descriptionInput, { target: { value: 'Nova Descrição' } });

    const dateInput = screen.getByTestId(dateInputTestId);
    fireEvent.change(dateInput, { target: { value: '2023-10-07' } });

    const updateButton = screen.getByTestId(addButtonTestId);
    fireEvent.click(updateButton);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const updatedTask = {
      id: '123',
      title: 'Tarefa Existente',
      description: 'Nova Descrição',
      date: '2023-10-07',
      category: 'Normal',
      isFinished: false,
    };

    expect(updatedTask).toEqual({
      id: '123',
      title: 'Tarefa Existente',
      description: 'Nova Descrição',
      date: '2023-10-07',
      category: 'Normal',
      isFinished: false,
    });
  });
});

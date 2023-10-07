import { storageGetTasks, storageSaveTask } from '@/storage/storageTasks';
import { TaskProps } from '@/types/task';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

/*
  Esse contexto tem por finalidade armazenar as tarefas do usuário. Ele é utilizado para que os componentes possam acessá-las e manipulá-las.

  - TaskContextProps: As propriedades do contexto.
  - TaskProviderProps: As propriedades do componente que provê o contexto.
  - taskList: A lista de tarefas.
  - setTaskList: A função que atualiza a lista de tarefas.
  - createTask: A função que cria uma nova tarefa.
  - removeTask: A função que remove uma tarefa.
  - updateTask: A função que atualiza uma tarefa.
  - filteredList: A lista de tarefas filtradas.
  - setFilteredList: A função que atualiza a lista de tarefas filtradas.
*/

type TaskContextProps = {
  taskList: TaskProps[];
  setTaskList: (taskList: TaskProps[]) => void;
  createTask: (newTask: TaskProps) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, newTask: TaskProps) => void;
  filteredList: TaskProps[];
  setFilteredList: (filteredList: TaskProps[]) => void;
};

type TaskProviderProps = {
  children: ReactNode;
};

const TaskContext = createContext<TaskContextProps>({} as TaskContextProps);

const TaskProvider = ({ children }: TaskProviderProps) => {
  const [taskList, setTaskList] = useState<TaskProps[]>([]);
  const [filteredList, setFilteredList] = useState<TaskProps[]>([]);

  const createTask = (newTask: TaskProps) => {
    setTaskList((prev) => {
      const newList = [...prev, newTask];

      storageSaveTask(newList);
      return newList;
    });

    toast.success('Tarefa criada com sucesso!');
  };

  const removeTask = (id: string) => {
    const newList = taskList.filter((task) => task.id !== id);

    setTaskList(newList);
    storageSaveTask(newList);

    toast.success('Tarefa removida com sucesso!');
  };

  const updateTask = (id: string, newTask: TaskProps) => {
    const newList = taskList.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          ...newTask,
        };
      }

      return task;
    });

    setTaskList(newList);
    storageSaveTask(newList);

    toast.success('Tarefa atualizada com sucesso!');
  };

  useEffect(() => {
    const tasks = storageGetTasks();
    setTaskList(tasks);
  }, []);

  useEffect(() => {
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

    setFilteredList(sortedTasks);
  }, [taskList]);

  return (
    <TaskContext.Provider
      value={{
        taskList,
        setTaskList,
        createTask,
        removeTask,
        updateTask,
        filteredList,
        setFilteredList,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };

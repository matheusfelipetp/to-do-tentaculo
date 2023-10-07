import { storageGetTasks, storageSaveTask } from '@/storage/storageTasks';
import { TaskProps } from '@/types/task';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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

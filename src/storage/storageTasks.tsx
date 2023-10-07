import { TaskProps } from '@/contexts/TaskContext';
import { TASKS_STORAGE } from './storageConfig';

export const storageSaveTask = (tasks: TaskProps[]) => {
  localStorage.setItem(TASKS_STORAGE, JSON.stringify(tasks));
};

export const storageGetTasks = () => {
  const tasks = localStorage.getItem(TASKS_STORAGE);

  if (tasks) {
    return JSON.parse(tasks) as TaskProps[];
  } else {
    return [];
  }
};

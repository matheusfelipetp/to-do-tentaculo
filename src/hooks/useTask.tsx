import { TaskContext } from '@/contexts/TaskContext';
import { useContext } from 'react';

/*
Esse hook tem por finalidade facilitar o uso do contexto de tarefas. 
*/

export const useTask = () => {
  const context = useContext(TaskContext);
  return context;
};

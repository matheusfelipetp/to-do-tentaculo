import { TaskContext } from '@/contexts/TaskContext';
import { useContext } from 'react';

export const useTask = () => {
  const context = useContext(TaskContext);
  return context;
};

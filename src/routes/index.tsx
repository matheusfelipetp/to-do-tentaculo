import { CalendarPage } from '@/pages/Calendar';
import { TasksPage } from '@/pages/Tasks';
import { Route, Routes } from 'react-router-dom';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
};

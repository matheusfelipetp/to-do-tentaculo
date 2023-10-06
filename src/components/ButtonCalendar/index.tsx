import { Calendar } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

export const ButtonCalendar = () => {
  return (
    <Link className="btn-calendar" to="calendar">
      <Calendar size={24} />
    </Link>
  );
};

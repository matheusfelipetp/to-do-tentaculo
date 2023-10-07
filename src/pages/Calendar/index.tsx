import { useTask } from '@/hooks/useTask';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { ArrowUUpLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export const CalendarPage = () => {
  const { taskList } = useTask();
  const navigate = useNavigate();

  const events = taskList.map((task) => ({
    title: task.title,
    date: task.date,
    color:
      task.category === 'Normal'
        ? '#289c68'
        : task.category === 'Prioridade'
        ? '#f5a623'
        : '#d0021b',
  }));

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <main className="calendar">
      <button className="btn-back" onClick={handleGoBack}>
        Voltar <ArrowUUpLeft size={16} />
      </button>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends
        events={events}
        locale="pt-br"
        buttonText={{
          today: 'Hoje',
          month: 'Mês',
          week: 'Semana',
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
      />
    </main>
  );
};

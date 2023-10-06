import dayGridPlugin from '@fullcalendar/daygrid';
import { default as FullCalendar } from '@fullcalendar/react';
import { ArrowUUpLeft } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export const CalendarPage = () => {
  const navigate = useNavigate();

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
        events={[
          {
            title: 'Evento 1',
            date: '2023-10-06',
          },
          {
            title: 'Evento 2',
            date: '2023-10-06',
          },
          {
            title: 'Evento 2',
            date: '2023-10-06',
          },
        ]}
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
        eventColor="#289c68"
      />
    </main>
  );
};

import { Calendar } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

/*
 Este componente representa um botão que redireciona o usuário para a página de calendário quando clicado. Ele exibe um ícone de calendário.
*/

export const ButtonCalendar = () => {
  return (
    <Link className="btn-calendar" to="calendar">
      <Calendar size={24} />
    </Link>
  );
};

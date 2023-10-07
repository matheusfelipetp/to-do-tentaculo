import { Logo } from '@/components/Logo';

/*
Este componente representa o cabeçalho da aplicação. Ele contém o logotipo da aplicação.
*/

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Logo />
      </div>
    </header>
  );
};

import LogoSvg from '@/assets/logo.svg';
import { Link } from 'react-router-dom';

/*
 Este componente representa o logotipo da aplicação. Ele é um link para a página inicial.
*/

export const Logo = () => {
  return (
    <Link to="/">
      <img className="logo" src={LogoSvg} alt="Logo Tentaculo" />
    </Link>
  );
};

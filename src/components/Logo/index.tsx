import LogoSvg from '@/assets/logo.svg';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/">
      <img className="logo" src={LogoSvg} alt="Logo Tentaculo" />
    </Link>
  );
};

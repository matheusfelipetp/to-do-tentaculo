import { Input } from '@/components/Input';
import { Logo } from '@/components/Logo';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <Input isSearch placeholder="Digite o nome da tarefa" />
      </div>
    </header>
  );
};

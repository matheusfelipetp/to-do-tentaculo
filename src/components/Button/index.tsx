import { PlusCircle } from '@phosphor-icons/react';
import { ButtonHTMLAttributes } from 'react';

/*
Este componente representa um botão interativo que pode ser clicado pelo usuário. Ele pode ser personalizado com várias propriedades para controlar seu comportamento.

- ButtonProps: As propriedades do componente.
- text: O texto exibido no botão.
- handleClick: Uma função de retorno que será chamada quando o botão for clicado.
- rest: Outras propriedades HTML do botão, como className, style, etc.
*/

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  handleClick?: () => void;
};

export const Button = ({ text, handleClick, ...rest }: ButtonProps) => {
  return (
    <button className="btn" onClick={handleClick} {...rest}>
      <p>{text}</p>
      <PlusCircle size={24} />
    </button>
  );
};

import { PlusCircle } from '@phosphor-icons/react';
import { ButtonHTMLAttributes } from 'react';

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

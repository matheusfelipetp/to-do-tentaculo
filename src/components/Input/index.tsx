import { MagnifyingGlass } from '@phosphor-icons/react';
import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  isSearch?: boolean;
  placeholder: string;
  type?: string;
  handleSearch?: () => void;
};

export const Input = ({
  isSearch = false,
  type = 'text',
  placeholder,
  handleSearch,
  ...rest
}: InputProps) => {
  return (
    <>
      <div className="container-input">
        <input
          className={`input ${isSearch && 'input-search'}`}
          type={type}
          placeholder={placeholder}
          {...rest}
        />

        {isSearch && (
          <MagnifyingGlass size={40} className="icon" onClick={handleSearch} />
        )}
      </div>
    </>
  );
};

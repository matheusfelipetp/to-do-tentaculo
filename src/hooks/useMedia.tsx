import { useEffect, useState } from 'react';

/*
  Esse hook tem por finalidade verificar se a media query passada por parâmetro é verdadeira ou falsa. Dessa forma, conseguimos controlar o comportamento do componente de acordo com o tamanho da tela do usuário.
*/

export const useMedia = (media: string) => {
  const [match, setMatch] = useState<boolean | null>(null);

  useEffect(() => {
    const changeMatch = () => {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    };
    changeMatch();
    window.addEventListener('resize', changeMatch);
    return () => {
      window.removeEventListener('resize', changeMatch);
    };
  }, [media]);

  return match;
};

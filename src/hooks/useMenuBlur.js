import { useEffect } from 'react';

export function useMenuBlur({ dep, callback }) {
  useEffect(() => {
    window.addEventListener('click', callback);

    return () => {
      window.removeEventListener('click', callback);
    };
  }, [...dep]);
}

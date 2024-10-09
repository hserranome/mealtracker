import { useRef } from 'react';

const BOUNCE_RATE = 500;

export const useDebounce = (defaultRate = BOUNCE_RATE) => {
  const busy = useRef(false);

  const debounce = async (callback: Function, rate = defaultRate) => {
    setTimeout(() => {
      busy.current = false;
    }, rate);

    if (!busy.current) {
      busy.current = true;
      callback();
    }
  };

  return debounce;
};
